import avatar from 'src/assets/images/header/avatar.svg'

export const RECENT_BOOKINGS_TABLE_DATA = () => {
    const recentBookingsData = [
        {
          artisan: 'Olajide Olajide',
          services: 'AC Service and Repair',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Mokola, Ibadan',
          status: 'Active',
          img: avatar,
        },
        {
          artisan: 'Olajide Kola',
          services: 'Mechanic',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Mokola, Ibadan',
          status: 'Canceled',
          img: avatar,
        },
        {
          artisan: 'Bola Seun',
          services: 'AC Service and Repair',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Ojoo, Ibadan',
          status: 'Completed',
          img: avatar,
        },
        {
          artisan: 'Olajide Olajide',
          services: 'AC Service and Repair',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Mokola, Ibadan',
          status: 'Completed',
          img: avatar,
        },
        {
          artisan: 'Olajide Olajide',
          services: 'AC Service and Repair',
          user: 'Olajide Olajide',
          time:'10:00am',
          location: 'Mokola, Ibadan',
          status: 'Active',
          img: avatar,
        },
      ]
  
    return recentBookingsData
  }
  
  export default RECENT_BOOKINGS_TABLE_DATA
  