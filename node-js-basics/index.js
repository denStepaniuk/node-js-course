console.log(`Hello world!`);
let response = {
  meteors: {
    date: [
      {
        id: null,
        name: null,
        diameter: null,
        is_potentially_hazardous_asteroid: null,
        close_approach_date_full: null,
        relative_velocity: null,
      }
    ]
  }
}
const date = '2024-03-05';
response.meteors[date] = response.meteors.date
delete response.meteors.date;
console.log(response)