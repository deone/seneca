var hotelsData = [
  {
    name: 'Alexander Plaza',
    manager: 'Dayo Osikoya',
    website: 'http://alexanderplaza.com/'
  },
  {
    name: 'Nova Hotel',
    manager: 'Lanre Osikoya',
    website: 'http://novahotel.com/'
  },
  {
    name: 'Movenpick',
    manager: 'Layi Osikoya',
    website: 'http://movenpick.com/'
  },
];

Template.hotelsList.helpers({
  hotels: function()  {
    return Hotels.find();
  }
});
