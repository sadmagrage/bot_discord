function Timer() {
    const bk_time = new Date(2023, 4-1, 9, 3, 6, 0);

    const now = new Date();
    const timeDif = now.getTime() - bk_time.getTime();

    const dayDif = parseInt(timeDif/1000/3600/24);
    const hourDif = parseInt(timeDif/1000/3600%24);
    const minuteDif = parseInt(timeDif/1000/60%60);
    const secondDif = parseInt(timeDif/1000%60);

    if (dayDif > 0) {
        return `${dayDif}:${hourDif}:${minuteDif}:${secondDif}`;
    }
    else if (hourDif > 0) {
        return `${hourDif}:${minuteDif}:${secondDif}`;
    }
    else if (minuteDif > 0) {
        return `${minuteDif}:${secondDif}`;
    }
    else {
        return `${secondDif}s`;
    }    
}

module.exports = Timer;
