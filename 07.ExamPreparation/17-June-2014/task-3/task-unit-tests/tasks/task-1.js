/* globals module */
function solve() {
  return function(selector){
    var result = `
    {{#each authors}}
    {{#if right}}
    <div class="box right">
    {{else}}
    <div class="box">
    {{/if}}
			<div class="inner">
				<p><img alt="{{name}}" src="{{image}}" width="100" height="133"></p>
				<div>
					<h3>{{name}}</h3>
					{{#each titles}}
					<p>{{{this}}}</p>
					{{/each}}
					<ul>
					{{#each urls}}
						<li><a href="{{this}}" target="_blank">{{this}}</a></li>
					{{/each}}
					</ul>
				</div>
			</div>
		</div>
    {{/each}}
    `;
    $(selector).html(result);
  }
}

module.exports = solve;