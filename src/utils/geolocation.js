export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada pelo navegador'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'MeuPonto App'
              }
            }
          );

          if (!response.ok) {
            throw new Error('Erro ao buscar localização');
          }

          const data = await response.json();

          const suburb = data.address?.suburb ||
                        data.address?.neighbourhood ||
                        data.address?.city_district ||
                        data.address?.city ||
                        'Localização desconhecida';

          const city = data.address?.city ||
                       data.address?.town ||
                       data.address?.village || '';

          const state = data.address?.state || '';

          let location = suburb;
          if (city && city !== suburb) {
            location += `, ${city}`;
          }
          if (state) {
            location += `, ${state}`;
          }

          resolve(location);
        } catch (error) {
          reject(new Error('Erro ao processar localização'));
        }
      },
      (error) => {
        reject(new Error('Erro ao obter localização: ' + error.message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};
