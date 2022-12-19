export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    mainlang: { type: 'string' }
  },
  required: ['name','mainlang']
} as const;
