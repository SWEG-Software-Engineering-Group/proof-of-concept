export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    mainlang: { type: 'string' },
    languages: { type: Array<"string"> },
    users: { type: Array<"string"> }
  },
  required: ['name','mainlang',"languages","users"]
} as const;
