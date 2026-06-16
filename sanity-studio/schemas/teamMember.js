export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Unique ID',
      type: 'string',
      description: 'Used for domain head mapping (e.g. frshijin, alphy)',
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Coordinator', value: 'coordinators'},
          {title: 'Student Coordinator', value: 'student_coordinators'},
          {title: 'Domain Head', value: 'domain_heads'},
          {title: 'Department Head', value: 'department_heads'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'links',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'WhatsApp', value: 'whatsapp'}
                ]
              }
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            }
          ]
        }
      ]
    },
    {
      name: 'sort_order',
      title: 'Sort Order',
      type: 'number',
      description: 'Determines the order of display on the team page'
    }
  ]
}
