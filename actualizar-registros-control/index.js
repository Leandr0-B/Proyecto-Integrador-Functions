const axios = require('axios'); // Asegúrate de instalar el paquete axios si aún no lo has hecho

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue) {
        context.log('JavaScript is running late!');
    }
    
    try {
        const getTokenResponse = await axios.post('https://residencialapi.azurewebsites.net/login', {
            ci: '1234',
            password: '1234'
        });

        const token = getTokenResponse.data.token;

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const actualizarPrescripcionesUrl = 'https://residencialapi.azurewebsites.net/prescripcion-control/actualizar-prescripciones-cronicas';

        const response = await axios.put(actualizarPrescripcionesUrl, null, { headers });

        context.log('Response:', response.data);
    } catch (error) {
        context.log('Error:', error);
    }

    context.log('JavaScript timer trigger function ran!', timeStamp);
};