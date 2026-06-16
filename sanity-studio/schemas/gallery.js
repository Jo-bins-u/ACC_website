export default {
  name: 'gallery',
  title: 'Domain Gallery',
  type: 'document',
  fields: [
    {
      name: 'domain',
      title: 'Domain Name',
      type: 'string',
      options: {
        list: [
          {title: 'Animation', value: 'animation'},
          {title: 'Liturgy', value: 'liturgy'},
          {title: 'Outreach', value: 'outreach'},
          {title: 'Audio & Visual', value: 'audiovisual'},
          {title: 'Logistics', value: 'logistic'},
          {title: 'Media & Doc', value: 'mediadoc'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image'}]
    }
  ]
}
