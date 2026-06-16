export default {
  name: 'event',
  title: 'Calendar Event',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Event ID',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date (YYYY-MM-DD)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Feast Day', value: 'feast'},
          {title: 'ACC General', value: 'acc'},
          {title: 'Liturgy & Prayers', value: 'liturgy'},
          {title: 'Outreach & Charity', value: 'outreach'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'time',
      title: 'Time',
      type: 'string',
      initialValue: 'All Day'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
