import avatar from 'src/assets/images/header/avatar.svg'

export const RECENT_BOOKINGS_TABLE_DATA = () => {
    const recentBookingsData = [
      //yyyy-mm-dd
        {
          artisan: 'Olajide Olajide',
          services: 'AC Service and Repair',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Mokola, Ibadan',
          status: 'Active',
          img: avatar,
          date:'2022-05-12'
        },
        {
          artisan: 'Olajide Kola',
          services: 'Mechanic',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Mokola, Ibadan',
          status: 'Canceled',
          img: avatar,
          date: '2022-08-10'
        },
        {
          artisan: 'Bola Seun',
          services: 'AC Service and Repair',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Ojoo, Ibadan',
          status: 'Completed',
          img: avatar,
          date: '2022-08-01'
        },
        {
          artisan: 'Olajide Olajide',
          services: 'AC Service and Repair',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Mokola, Ibadan',
          status: 'Completed',
          img: avatar,
          date: '2022-01-01'
        },
        {
          artisan: 'Olajide Olajide',
          services: 'AC Service and Repair',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Mokola, Ibadan',
          status: 'Active',
          img: avatar,
          date: '2022-04-01'
        },
      ]
  
    return recentBookingsData
  }
  
  export default RECENT_BOOKINGS_TABLE_DATA
  