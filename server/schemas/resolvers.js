// import everything I need for the graphql routes
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// resovlers basically holds all of the api routes
const resolvers = {
  // queries are basically just get requests
  // route to get the user
  Query: {
    me: async (parent, args, context) => {
      // using context to get the user information
      // basically if user exists then grab the user by its id while adding their saved books
      if (context.user) {
        // populate has to be in lowercase and is not case insensitive
        const userData = await User.findOne({ _id: context.user._id }).populate(
          "savedbooks"
        );
        return userData;
      }
      //if not then throw an error
      throw new AuthenticationError(
        "You are not logged in, can't find anything!"
      );
    },
  },
  // mutations are basically routes that do something other than a get request
  // learned something new so if you are adding something to a model you need to call it by that models name
  // with the model user for example if I want to add a user I can't have a const that is named something different to the model so in this case User is already taken so I have to use 'user' which is lowercase
  // either that or it's because I specifically said in context that it is context.user to say I am getting my info from that
  Mutation: {
    // route to add a user
    addUser: async (parent, args, context) => {
      // creating a user args represent all of the typeDefs in the user model
      const user = await User.create(args);
      // once a user is created then giving that user a token
      const token = signToken(user);
      // using deconstruction returning the token and user that way it can be properly authenticated
      return { token, user };
    },
    // route to login
    // deconstructing the args to specifically get the email and password from the user model
    login: async (parent, { email, password }) => {
      // first get the user's email
      const user = await User.findOne({ email });
      // if user doesn't exist throw err
      if (!user) {
        throw new AuthenticationError(
          "No users found or user does not exist: wrong credentials(?)"
        );
      }
      // if the user is found then check the password
      const checkPass = await user.isCorrectPassword(password);
      // if password is wrong then throw an error
      if (!checkPass) {
        throw new AuthenticationError(
          "password does not match, please try again"
        );
      }
      // if all is good then create a token for the user that way they can log in
      const token = signToken(user);
      return { token, user };
    },
    // route to save the books to a favorite list
    addTipHistory: async (parent, args, context) => {
      // check if the user is logged in
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { tipHistory: args } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError(
        "not logged in, please log in to use this feature"
      );
    },
    addPercentage: async (parent, args, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { percentage: args } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError(
        "not logged in, please log in to use this feature"
      );
    },
  },
};

// export resolvers
module.exports = resolvers;
