# Introducing the PHS-Data Commons Wizard Prototype

This prototype blends the talents of the Google Data Commons team, the Stanford Center for Population Health Sciences (PHS) team, 
and the Stanford Center for Biomedical Informatics Research (BMIR) team to create a low-friction tool
to discover and use freely available research data.

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
through which researchers can specify the locations and subjects for which they want data.
Researchers can select whether they want to receive the timestamp and/or other provenance for the data.
The Wizard can download the latest data for those locations and subjects, as they are available in the Data Commons,
or provide R code that will query the Data Commons directly for the data. 
(Code is also available to integrate the resulting values into the researcher's data table, 
using the chosen location type (zip codes, city name, etc.) as the lookup index for the retrieved values.

The result is a simple web interface that can provide data 
for most [Data Commons statistical variables](https://docs.datacommons.org/statistical_variables.html)
to researchers at any level, including non-technical users.

## Project Status

The PHS-Data Commons project prototype will be under development for at least the next several months
to increase its capabilities and its ease of use.
Given additional funding, we will be able to make it more powerful and even easier to use.
and to begin designing similar technologies to retrieve data from the Biomedical Data Commons graph.

### Providing feedback

To provide feedback, please enter a ticket to the 
[Data Commons Wizard GitHub repository](https://github.com/metadatacenter/phs-gdc/issues) or send email to 
jgraybeal (at) stanford.edu. 
