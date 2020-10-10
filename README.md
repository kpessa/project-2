# Project 2 COVID Dashboard

#### **Objectives**
<br/>

Inspired by the COVID-19 Community Vulnerability Index ([CCVI](https://precisionforcovid.org/ccvi)) that seeks to identify which communities may need the most support as coronavirus takes hold, our project aims to:
* Explore factors that may contribute to COVID-19 death rates at the county-level in Florida
* Develop a dashboard prototype that can be expanded to cover data on the whole of U.S. at a later stage
<br/>
<br/>

#### **Data Sources**
<br/>

1. [CCVI](https://precisionforcovid.org/ccvi)
2. [NYTimes COVID-19 County Level Data](https://github.com/nytimes/covid-19-data)
3. [USDA County Level Population (2019)](https://www.ers.usda.gov/webdocs/DataFiles/48747/PopulationEstimates.xls?v=4511.1)
4. [USDA County Level Median Income (2018)](https://www.ers.usda.gov/webdocs/DataFiles/48747/Unemployment.xls?v=4511.1 )
5. [County Health Rankings](https://www.countyhealthrankings.org/explore-health-rankings/rankings-data-documentation)
<br/>
<br/>

#### **Building the Dashboard**
<br/>

Process             |Language/Tools
--------            |--------
Data cleaning*      |Jupyter Notebook
Database setup      |SQLite
Falsk API setup     |Python
Dashboard page      |HTML / CSS / JavaScript**
App deployment      |Heroku

<br/>
Link to dashboard: https://project-2-covid.herokuapp.com/
<br/>
<br/>

\* _The cleaned dataset for U.S. contains over 3,000 records of data and that of Florida contains 67 records (i.e. 67 counties)._
<br/>

\*\* _New js libraries used:_
* [anime js](https://animejs.com/)
* [d3 regression](https://github.com/HarryStevens/d3-regression)
<br/>
<br/>

#### **Observations**
<br/>

* Counties with the higher percentage of population reporting fair or poor health, uninsured population or lower median income (e.g. Hendry and Glades) tend to show a higher vulnerability score (over 0.9), meaning at a greater risk in the face of pandemic.
<br/>

* Miami-Dade has the highest number of cases, deaths, case rates and death rates (per 100,000 population) as of 9/30/2020, as well as the largest population size. Population and population density may have been some of driving factors for the widespread COVID impact.
<br/>
<br/>

#### **Ideas for Next Steps**
<br/>

* Explore further the correlation between population size/density with case number, case rates, death toll and death rates. For example, add population variables to the x-axis of the scatter plot 
<br/>

* Add data of all other states to the dashboard



