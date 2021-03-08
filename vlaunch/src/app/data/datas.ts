import { NavItem } from '../models/menu_item';

export const QUILL_CONFIG = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ align: [] }],
  ],
};

export const NAV_ITEMS: NavItem[] = [
  {
    displayName: 'Trang chủ',
    iconName: 'home',
    route: '',
  },
  {
    displayName: 'Sản phẩm',
    iconName: 'storefront',
    route: 'dashboard/product',
  },
  {
    displayName: 'Sản phẩm modify',
    iconName: 'storefront',
    route: 'dashboard/product-modify',
  },
  {
    displayName: 'Đơn hàng',
    iconName: 'storefront',
    route: 'dashboard/order',
  },

  // {
  //   displayName: 'TextRouter',
  //   iconName: 'videocam',
  //   route: 'orlando',
  //   children: [
  //     {
  //       displayName: 'Speakers',
  //       iconName: 'group',
  //       route: 'orlando/speakers',
  //       children: [
  //         {
  //           displayName: 'Michael Prentice',
  //           iconName: 'person',
  //           route: 'orlando/speakers/michael-prentice',
  //           children: [
  //             {
  //               displayName: 'Create Enterprise UIs',
  //               iconName: 'star_rate',
  //               route: 'orlando/speakers/michael-prentice/material-design',
  //             },
  //           ],
  //         },
  //         {
  //           displayName: 'Stephen Fluin',
  //           iconName: 'person',
  //           route: 'orlando/speakers/stephen-fluin',
  //           children: [
  //             {
  //               displayName: "What's up with the Web?",
  //               iconName: 'star_rate',
  //               route: 'orlando/speakers/stephen-fluin/what-up-web',
  //             },
  //           ],
  //         },
  //         {
  //           displayName: 'Mike Brocchi',
  //           iconName: 'person',
  //           route: 'orlando/speakers/mike-brocchi',
  //           children: [
  //             {
  //               displayName: 'My ally, the CLI',
  //               iconName: 'star_rate',
  //               route: 'orlando/speakers/mike-brocchi/my-ally-cli',
  //             },
  //             {
  //               displayName: 'Become an Angular Tailor',
  //               iconName: 'star_rate',
  //               route: 'orlando/speakers/mike-brocchi/become-angular-tailor',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       displayName: 'Sessions',
  //       iconName: 'speaker_notes',
  //       route: 'orlando/sessions',
  //       children: [
  //         {
  //           displayName: 'Create Enterprise UIs',
  //           iconName: 'star_rate',
  //           route: 'orlando/sessions/material-design',
  //         },
  //         {
  //           displayName: "What's up with the Web?",
  //           iconName: 'star_rate',
  //           route: 'orlando/sessions/what-up-web',
  //         },
  //         {
  //           displayName: 'My ally, the CLI',
  //           iconName: 'star_rate',
  //           route: 'orlando/sessions/my-ally-cli',
  //         },
  //         {
  //           displayName: 'Become an Angular Tailor',
  //           iconName: 'star_rate',
  //           route: 'orlando/sessions/become-angular-tailor',
  //         },
  //       ],
  //     },
  //     {
  //       displayName: 'Feedback',
  //       iconName: 'feedback',
  //       route: 'orlando/feedback',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Maleficent',
  //   iconName: 'videocam',
  //   route: 'maleficent',
  //   children: [
  //     {
  //       displayName: 'Speakers',
  //       iconName: 'group',
  //       route: 'maleficent/speakers',
  //       children: [
  //         {
  //           displayName: 'Michael Prentice',
  //           iconName: 'person',
  //           route: 'maleficent/speakers/michael-prentice',
  //           children: [
  //             {
  //               displayName: 'Create Enterprise UIs',
  //               iconName: 'star_rate',
  //               route: 'maleficent/speakers/michael-prentice/material-design',
  //             },
  //           ],
  //         },
  //         {
  //           displayName: 'Stephen Fluin',
  //           iconName: 'person',
  //           route: 'maleficent/speakers/stephen-fluin',
  //           children: [
  //             {
  //               displayName: "What's up with the Web?",
  //               iconName: 'star_rate',
  //               route: 'maleficent/speakers/stephen-fluin/what-up-web',
  //             },
  //           ],
  //         },
  //         {
  //           displayName: 'Mike Brocchi',
  //           iconName: 'person',
  //           route: 'maleficent/speakers/mike-brocchi',
  //           children: [
  //             {
  //               displayName: 'My ally, the CLI',
  //               iconName: 'star_rate',
  //               route: 'maleficent/speakers/mike-brocchi/my-ally-cli',
  //             },
  //             {
  //               displayName: 'Become an Angular Tailor',
  //               iconName: 'star_rate',
  //               route: 'maleficent/speakers/mike-brocchi/become-angular-tailor',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       displayName: 'Sessions',
  //       iconName: 'speaker_notes',
  //       route: 'maleficent/sessions',
  //       children: [
  //         {
  //           displayName: 'Create Enterprise UIs',
  //           iconName: 'star_rate',
  //           route: 'maleficent/sessions/material-design',
  //         },
  //         {
  //           displayName: "What's up with the Web?",
  //           iconName: 'star_rate',
  //           route: 'maleficent/sessions/what-up-web',
  //         },
  //         {
  //           displayName: 'My ally, the CLI',
  //           iconName: 'star_rate',
  //           route: 'maleficent/sessions/my-ally-cli',
  //         },
  //         {
  //           displayName: 'Become an Angular Tailor',
  //           iconName: 'star_rate',
  //           route: 'maleficent/sessions/become-angular-tailor',
  //         },
  //       ],
  //     },
  //     {
  //       displayName: 'Feedback',
  //       iconName: 'feedback',
  //       route: 'maleficent/feedback',
  //     },
  //   ],
  // },
];
