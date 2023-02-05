export default {
  type: "object",
  properties: {
    key: { type: 'string' },
    group: { type: 'string' },
    text: { type: 'string' },
    comment: { type: 'string' },
    review: { type: 'bool' },
  },
  required: ['key','group','text','comment','review']
} as const;
