# Introducing the PHS-Data Commons Wizard Prototype

This advanced prototype blends the talents of the Google Data Commons team, 
the Stanford Center for Population Health Sciences (PHS) team, 
and the Stanford Center for Biomedical Informatics Research (BMIR) team to create a low-friction tool
to discover and use freely available research data.

See the [Instructions](#instructions) section for information on using this tool. 

## Opportunity

### The data

The Google-provided [Data Commons repository](https://datacommons.org/) provides access to many public data sets 
for research in many domains. The Data Commons Graph aggregates data from many different data sources
into a single graph database, so that it can be accessed in a consistent way.
This data is browseable by [place](https://datacommons.org/place/) or [entity](https://datacommons.org/browser/), 
and publicly accessible via APIs, with numerous [python libraries](http://docs.datacommons.org/api/) 
and [Python workbook examples](http://docs.datacommons.org/tutorials). 

### The researchers

Researchers in the Stanford PHS team, like all biomedical data researchers, must find, obtain, and integrate useful data quickly.
At PHS, the goal is to improve the health of populations by bringing together diverse disciplines and data 
to understand and address social, environmental, behavioral, and biological factors on both a domestic and global scale.
PHS takes a data management approach that openly seeks more advanced ways to access and integrate related data sets,
and with BMIR provides research-centric leadership of the PHS-Data Commons project.

### The developers

The BMIR team brings its experience with research data and [metadata](https://metadatacenter.org), [semantic technologies](https://bioontology.org), 
and highly usable and scalable research software to make Data Commons resources readily accessible 
to PHS researchers and the larger research community.
Through analysis of the data models and availability in the Data Commons, 
the BMIR team finds and implements highly efficient ways for researchers
to find any relevant data and bring it into their own data sets.

## The Data Commons Wizard

The [Data Commons Wizard prototype](https://dcw.metadatacenter.org) provides a simple interface
through which researchers can specify the locations and topics for which they want data.
Researchers can select whether they want to receive the timestamp and/or other provenance for the data.
The Wizard can download the latest data for those locations and topics, as they are available in the Data Commons,
or provide R code that will query the Data Commons directly for the data. 
(Code is also available to integrate the resulting values into the researcher's data table, 
using the chosen location type (zip codes, city name, etc.) as the lookup index for the retrieved values.

The result is a simple web interface that can provide data 
for most [Data Commons statistical variables](https://docs.datacommons.org/statistical_variables.html)
to researchers at any level, including non-technical users.

## Project Status

The PHS-Data Commons project prototype will be under development at least through Spring 2021
to increase its capabilities and its ease of use.
Given additional funding, we will make it more powerful and even easier to use.
We also want to begin designing similar technologies to retrieve data from the Biomedical Data Commons graph.

## Instructions

In the first column, enter the location type you want to use as your index variable, and
the specific locations for which you want to retrieve data. 
When entering specific locations, you can enter them as individual locations of that type
(follow the format of the example under the entry window),
or you can choose to get data for all the locations in one or more states. 
Autocompletion is provided when there are a small number of entities.

Be aware that the a Statistic Variable may not have data in every location type, 
or in every individual location within a location type. 
To save time finding appropriate location types for viewing your Statistical Variable(s),
you can view an [availability table](https://docs.google.com/spreadsheets/d/1s7jurDfn-c9iHyNQ6QnfnPGYV6j6bd75cF3fbvwf9Lc/edit#gid=1723876967)
showing the available location types for all the Statistic Variables.
The [summary page](https://docs.google.com/spreadsheets/d/1s7jurDfn-c9iHyNQ6QnfnPGYV6j6bd75cF3fbvwf9Lc/edit#gid=155287420) provides additional information
about the table and how to use it.

Once you have entered locations and Statistical Variables, 
you can request a data file containing the requested data ('Download Data'), and/or 
R code to let you work with the data ('Generate R Code'). 
R code is provided for two use cases: integrating data from the provided file with your data,
or making requests for the data directly to the Data Commons REST APIs.
In either case, you will need to initialize the R libraries before the first time you use the code.

Some options are provided to configure the returned data. 
Click on the gear menu in the third column to see the latest options.

### Providing feedback

Three options are provided for your feedback. You can enter a ticket in the 
[Wizard GitHub issues](https://github.com/metadatacenter/phs-gdc/issues),
use the Feedback link in the lower right of the Wizard,
or send email to jgraybeal (at) stanford.edu. 
You can visit the [Wizard's GitHub repository](https://github.com/metadatacenter/phs-gdc) by clicking on the GitHub icon
in the upper right of the third column.
