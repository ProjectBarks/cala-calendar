class Calendar {
    constructor(div, date=new Date()) {
        this.mainDiv = div;
        if (this.mainDiv.dataset.date)
            date = new Date(this.mainDiv.dataset.date);
        this.setDate(date);
    }

    /**
     * Return an array of the weeks initials. These will be used to generate headers for the calendar.
     *
     * @returns {string[]}
     */
    getWeekInitials() {
        return ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    }

    getDate() {
        return new Date(this.date);
    }

    setDate(date) {
        if (!(date instanceof Date))
            throw 'Only pass date objects!';
        this.date = date;
        this._render();
    }

    nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1);
        this._render();
    }

    prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1);
        this._render();
    }

    _render() {
        this.mainDiv.innerHTML = '';
        if (!this.mainDiv.className.includes('calendar'))
            this.mainDiv.className += ' calendar';
        this.mainDiv.insertAdjacentHTML('beforeend', this._getHeader());

        this.mainDiv.insertAdjacentHTML('beforeend', `<span class="offset"></span>`);
        let firstDay = this._getFirstDay();
        let offset = this.mainDiv.getElementsByClassName('offset')[0];
        let display = firstDay.getDay() === 0 ? 'none' : 'initial';
        let gridColumn = firstDay.getDay() + 1;
        offset.setAttribute('style', `display: ${display}; grid-column: 1 / ${gridColumn}`);

        this.mainDiv.insertAdjacentHTML('beforeend', this._getDays().join(' '));
    }

    _getHeader() {
        return `
            <div class="header">
                ${this.getWeekInitials().map((day, index) => {
                    let position = 'center';
                    if (index === 0)
                        position = 'first';
                    else if (index === 6)
                        position = 'last';
                        
                    return `<div class=\"${position}\">${day}</div>`;
                }).join(' ')}
            </div>
        `;
    }

     _getDays() {
         let currentDay = this._getFirstDay();
        let days = [];
        while (currentDay.getMonth() === this.date.getMonth()) {
            let classes = ['day'];
            switch (currentDay.getDay()) {
                case 0:
                    classes.push('first');
                    break;
                case 6:
                    classes.push('last');
                    break;
            }
            days.push(`<div class=\"${classes.join(' ')}\">${currentDay.getDate()}</div>`);
            currentDay.setDate(currentDay.getDate() + 1);
        }
        return days;
    }

    _getFirstDay() {
        let day = new Date(this.date);
        day.setDate(1);
        return day;
    }
}
