# Load the 'dplyr' package. If it's not installed, run install.packages("dplyr")
library(dplyr)

# (Optional) Set your working directory
setwd("/path_to/your_working_directory")

# Read the user's data into a data frame
df1 <- read.csv("/path_to/your_data_file.csv", header = T)

# Read the downloaded Data Commons CSV file into a new data frame
df2 <- read.csv("/path_to/dcw_data.csv", header=T)

# Merge the two data frames using the appropriate column names
col1 = "zip"
col2 = "zipCode"
merged_df <- left_join(df1, df2, by=setNames(nm=col1, col2))

# (Optional) Export merged data to CSV
write.csv(merged_df, "/path_to/merged_data.csv", row.names = F)