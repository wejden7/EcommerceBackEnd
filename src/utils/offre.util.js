const moment = require("moment-timezone");
const inTime = (offres) => {
    // check if tous les offre in time zone debut
    offres = offres.filter((offre) => {
      return offreInTime(offre);
    });
    return offres;
  };
  
  const offreInTime = (offre) => {
    const dateTimeDebut=offre.dateTimeDebut;
    const dateTimeFin=offre.dateFin;
    const dateNew = moment.tz(new Date(), "Africa/Tunis");
    const dateDebut = moment.tz(dateTimeDebut, "Africa/Tunis");
    const dateFin = moment.tz(dateTimeFin, "Africa/Tunis");
    const durationDebut = moment.duration(dateNew.diff(dateDebut));
    const durationFint = moment.duration(dateFin.diff(dateNew));
    const condiction =
      durationDebut._milliseconds > 0 && durationFint._milliseconds > 0;
    return condiction;
  };

module.exports={inTime,offreInTime }