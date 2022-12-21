export default {
  type: "object",
  properties: {
    key: { type: 'string' },
    group: { type: 'string' },
    text: { type: 'string' },
    comment: { type: 'string' },
  },
  required: ['key','group','text','comment']
} as const;
