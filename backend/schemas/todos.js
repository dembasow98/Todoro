export default {
    name: 'todos',
    type: 'document',
    title: 'Todos',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'description',
        type: 'string',
        title: 'Description'
      },
      {
        name: 'completed',
        type: 'boolean',
        title: 'Completed'
      }
    ]
  }