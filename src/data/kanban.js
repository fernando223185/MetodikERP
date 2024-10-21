import team1 from 'assets/img/team/1.jpg';
import team2 from 'assets/img/team/2.jpg';
import team3 from 'assets/img/team/3.jpg';
import team4 from 'assets/img/team/4.jpg';
import team5 from 'assets/img/team/5.jpg';
import team6 from 'assets/img/team/6.jpg';
import kanban1 from 'assets/img/kanban/1.jpg';
import kanban2 from 'assets/img/kanban/2.jpg';
import kanban3 from 'assets/img/kanban/3.jpg';
import kanban4 from 'assets/img/kanban/4.jpg';
import beach from 'assets/video/beach.jpg';
import beachVideo from 'assets/video/beach.mp4';

export const members = [
  { id: 1, name: 'Anna Karinina', img: team1, role: 'Member' },
  { id: 2, name: 'Antony Hopkins', img: team2, role: 'Member' },
  { id: 3, name: 'Rowan Atkinson', img: team3, role: 'Member' },
  { id: 4, name: 'John Doe', img: team4, role: 'Member' },
  { id: 5, name: 'Emily Rose', img: team5, role: 'Member' },
  { id: 6, name: 'Marry Jane', img: team6, role: 'Member' }
];

export const labels = [
  { text: 'New', type: 'success' },
  { text: 'Goal', type: 'primary' },
  { text: 'Enhancement', type: 'info' },
  { text: 'Bug', type: 'danger' },
  { text: 'Documentation', type: 'secondary' },
  { text: 'Helper', type: 'warning' }
];

export const attachments = [
  {
    id: 1,
    image: kanban3,
    src: kanban3,
    title: 'final-img.jpg',
    date: '2020-04-18 5:25 pm',
    type: 'image'
  },
  {
    id: 2,
    image: kanban4,
    src: kanban4,
    title: 'picture.png',
    date: '2020-04-20 4:34 pm',
    type: 'image'
  },
  {
    id: 3,
    src: `#!`,
    title: 'sample.txt',
    date: '2020-04-21 2:10 pm',
    type: 'txt'
  },
  {
    id: 4,
    src: `#!`,
    title: 'example.pdf',
    date: '2020-05-02 11:34 am',
    type: 'pdf'
  },
  {
    id: 5,
    image: beach,
    src: beachVideo,
    title: 'beach.mp4',
    date: '2020-05-10 3:40 pm',
    type: 'video'
  }
];

export const kanbanItems = [
  {
    id: 1,
    name: 'Sprinter - #12424 / Ometepec - General Anaya',
    items: [
      {
        id: 1237865,
        title:
          'Daniel García',
        labels: [
          { type: 'success', text: 'Adulto' },
          { type: 'primary', text: 'Asiento 10' },
          { type: 'secondary', text: 'Reserva #13434' }
        ],
      },      
      {
        id: 124525,
        title:
          'Sofía Pérez',
        labels: [
          { type: 'warning', text: 'Inapam' },
          { type: 'primary', text: 'Asiento 11' },
          { type: 'secondary', text: 'Reserva #142224' }
        ],
      },
      {
        id: 125525,
        title:
          'Alejandro López',
        labels: [
          { type: 'danger', text: 'Niño' },
          { type: 'primary', text: 'Asiento 12' },
          { type: 'secondary', text: 'Reserva #12234' }
        ],
      },
      {
        id: 1255252,
        title:
          'Valeria Sánchez',
        labels: [
          { type: 'success', text: 'Adulto' },
          { type: 'primary', text: 'Asiento 1' },
          { type: 'secondary', text: 'Reserva #1244' }
        ],
      },
    ]
  },
  {
    id: 2,
    name: 'Sprinter - #13284 / Ometepec - Puebla',
    items: [
      {
        id: 12315525,
        title:
          'Mariana Torres',
        labels: [
          { type: 'success', text: 'Adulto' },
          { type: 'primary', text: 'Asiento 10' },
          { type: 'secondary', text: 'Reserva #12214' }
        ],
      },      
      {
        id: 1241859585,
        title:
          'Gabriela Castro',
        labels: [
          { type: 'warning', text: 'Inapam' },
          { type: 'primary', text: 'Asiento 11' },
          { type: 'secondary', text: 'Reserva #12144' }
        ],
      },
      {
        id: 12519,
        title:
          'Alejandro López',
        labels: [
          { type: 'danger', text: 'Niño' },
          { type: 'primary', text: 'Asiento 12' },
          { type: 'secondary', text: 'Reserva #124232' }
        ],
      },
      {
        id: 125159,
        title:
          'Lucía Herrera',
        labels: [
          { type: 'success', text: 'Adulto' },
          { type: 'primary', text: 'Asiento 18' },
          { type: 'secondary', text: 'Reserva #124344' }
        ],
      },
    ]
  },
  {
    id: 3,
    name: 'Sprinter - #198484 / Ometepec - Lazaro Cardenas',
    items: [
      {
        id: 123259504,
        title:
          'Martina Silvia',
        labels: [
          { type: 'success', text: 'Adulto' },
          { type: 'primary', text: 'Asiento 10' },
          { type: 'secondary', text: 'Reserva #198924' }
        ],
      },      
      {
        id: 12420504,
        title:
          'Fernanda Campos',
        labels: [
          { type: 'warning', text: 'Inapam' },
          { type: 'primary', text: 'Asiento 22' },
          { type: 'secondary', text: 'Reserva #19024' }
        ],
      },
      {
        id: 125209,
        title:
          'Andrés Romero',
        labels: [
          { type: 'danger', text: 'Niño' },
          { type: 'primary', text: 'Asiento 20' },
          { type: 'secondary', text: 'Reserva #109424' }
        ],
      },
      {
        id: 1252495,
        title:
          'Jimena Escobar',
        labels: [
          { type: 'success', text: 'Adulto' },
          { type: 'primary', text: 'Asiento 12' },
          { type: 'secondary', text: 'Reserva #1240904' }
        ],
      },
    ]
  },
  {
    id: 4,
    name: 'Sprinter - #82893nf / Ometepec - Chilpancingo',
    items: [
      {
        id: 12335940,
        title:
          'Santiago Montoya',
        labels: [
          { type: 'success', text: 'Adulto' },
          { type: 'primary', text: 'Asiento 10' },
          { type: 'secondary', text: 'Reserva #120984' }
        ],
      },      
      {
        id: 1243525,
        title:
          'Julia Bautista',
        labels: [
          { type: 'warning', text: 'Inapam' },
          { type: 'primary', text: 'Asiento 14' },
          { type: 'secondary', text: 'Reserva #1224434' }
        ],
      },
      {
        id: 12535663,
        title:
          'Rafael Olivares',
        labels: [
          { type: 'danger', text: 'Niño' },
          { type: 'primary', text: 'Asiento 15' },
          { type: 'secondary', text: 'Reserva #129874' }
        ],
      },
      {
        id: 125315255,
        title:
          'Romina Rosales',
        labels: [
          { type: 'success', text: 'Adulto' },
          { type: 'primary', text: 'Asiento 10' },
          { type: 'secondary', text: 'Reserva #129044' }
        ],
      },
    ]
  }
];

export const comments = [
  {
    id: 1,
    user: {
      name: 'Rowan',
      avatar: team4
    },
    text: 'This time we should finish the task before the deadline',
    time: '23min'
  },
  {
    id: 2,
    user: {
      name: 'Emma',
      avatar: team1
    },
    text: 'We have more task to do',
    time: '2hour'
  }
];

export const activities = [
  {
    id: 1,
    user: {
      name: 'Rowan',
      avatar: team4
    },
    activity: 'Added the card',
    time: '6 hours ago'
  },
  {
    id: 2,
    user: {
      name: 'Anna',
      avatar: team3
    },
    activity: 'attached final-pic.png to this card',
    time: '4 hours ago'
  }
];
