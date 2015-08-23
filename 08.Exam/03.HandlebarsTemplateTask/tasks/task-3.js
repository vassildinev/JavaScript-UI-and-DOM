/* globals module */
function solve() {
    return function (selector) {
            var result = `<div class="events-calendar"><h2 class="header">Appointments for <span class="month">{{month}}</span> <span class="year">{{year}}</span></h2>{{#each days}}<div class="col-date"><div class="date">{{day}}</div><div class="events">{{#each events}}<div class="event {{importance}}"><div class="title" {{#if comment}}title="{{comment}}{{/if}}">{{#if title}}{{title}}{{else}}Free slot{{/if}}</div>{{#if time}}<span class="time">at: {{time}}</span>{{/if}}</div>{{/each}}</div></div>{{/each}}</div>`;
        document.getElementById(selector).innerHTML = result;
    }
}

module.exports = solve;