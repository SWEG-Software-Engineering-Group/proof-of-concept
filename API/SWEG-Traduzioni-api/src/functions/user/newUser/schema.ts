export default {
  type: "object",
  properties: {
    username: { type: String },
    password: { type: String },
    type: { type: String },
    email: { type: String }
  },
  required: ['username', 'password', "type", "email"]
} as const;
