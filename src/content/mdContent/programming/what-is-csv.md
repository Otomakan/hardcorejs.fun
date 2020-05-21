---
	layout: blog-page
	title: What is the CSV format
	meta_description: 
	author: Jack Misteli
	subtitle: 
	categories:
---

<h2>Comma separated file</h2>

As you now already now, CSV stands for Comma separated file. It is a file that uses commas to separate values. 

CSV is one of the most popular format to store data. You might have already encountered it when exporting data from an Excel spread sheet.

<h2>Specifications</h2>

<p>There is no official standard for the CSV format. There is a <a href="<a href="https://tools.ietf.org/html/rfc4180">Request for Comment (RFC) which attempts to codify it</a>.</p>

<p>Here is what a CSV usually looks like: </p>

<code>
Entity,Code,Year,
Australia,AUS,2017,0.09
Indonesia,IDN,2017,0.18
United Kingdom,GBR,2017,0.08
United States,USA,2017,0.16
</code>
<span>You can find the file <a href="/assets/data/correlation-income-and-life-satisfaction.csv">here</a></span>

<p>You can see that each line is equivalent to a row.</p>

<table class="table table-bordered table-hover table-condensed">
<thead><tr><th title="Field #1">Entity</th>
<th title="Field #2">Code</th>
<th title="Field #3">Year</th>
<th title="Field #4">FIELD4</th>
</tr></thead>
<tbody><tr>
<td>Australia</td>
<td>AUS</td>
<td align="right">2017</td>
<td align="right">0.09</td>
</tr>
<tr>
<td>Indonesia</td>
<td>IDN</td>
<td align="right">2017</td>
<td align="right">0.18</td>
</tr>
<tr>
<td>United Kingdom</td>
<td>GBR</td>
<td align="right">2017</td>
<td align="right">0.08</td>
</tr>
<tr>
<td>United States</td>
<td>USA</td>
<td align="right">2017</td>
<td align="right">0.16</td>
</tr>
</tbody></table>

We also made <a href="/javascript/13-04-2020-building-a-line-chart-with-d3.html"> a visualization using this data and d3 here</a>.
