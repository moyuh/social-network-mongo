const dateSuff= (date) => {
    let dateString = date.toString();
    
    const lastInDateString = dateString.charAt(dateString.length - 1);

    if(lastInDateString === '1' && dateString !== '11') {
        dateString = `${dateString}st`;
    }else if (lastInDateString === '2' && dateString !== '12' ) {
        dateString = `${dateString}nd`;
    }else if (lastInDateString === '3' && dateString !== '13' ) {
        dateString = `${dateString}rd`;
    }else {
        dateString = `${dateString}th`
    }
    return dateString;
};

module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
) => {
    const months = {
        0: monthLength === 'short' ? 'Jan' : 'January',
        1: monthLength === 'short' ? 'Feb' : 'February',
        2: monthLength === 'short' ? 'Mar' : 'March',
        3: monthLength === 'short' ? 'Apr' : 'April',
        4: monthLength === 'short' ? 'May' : 'May',
        5: monthLength === 'short' ? 'Jun' : 'June',
        6: monthLength === 'short' ? 'Jul' : 'July',
        7: monthLength === 'short' ? 'Aug' : 'August',
        8: monthLength === 'short' ? 'Sep' : 'September',
        9: monthLength === 'short' ? 'Oct' : 'October',
        10: monthLength === 'short' ? 'Nov' : 'November',
        11: monthLength === 'short' ? 'Dec' : 'December',
      };

      const dateObject = new Date (timestamp);

      const formattedMonth = months[dateObject.getMonth()];

      const monthDay = dateSuffix
      ? dateSuff(dateObject.getDate()) 
      : dateObject.getDate();

      const year = dateObject.getFullYear();
      let hour = dateObject.getHours() > 12
      ? Math.floor(dateObject.getHours() - 12)
      : dateObject.getHours();

      if (hour === 0) {
        hour = 12;
      }

      const minutes = (dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes();

      const timeOfDay = dateObject.getHours() >= 12 ? 'pm' : 'am';

      const formattedTimeStamp = `${formattedMonth} ${monthDay},${year} at ${hour}:${minutes} ${timeOfDay}`;

      return formattedTimeStamp;
};