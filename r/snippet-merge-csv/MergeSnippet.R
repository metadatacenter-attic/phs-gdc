# Please fill in the following constants according to your folder/file names
wd <- "~/Desktop/r_wd"
user_filename <- "user_data.csv"
dcw_filename <- "dcw_data.csv"
user_colname = "zip"
dcw_colname = "zipCode"
output_filename <- "merged_data.csv"

# Load the 'dplyr' package. If it's not installed, run install.packages("dplyr")
library(dplyr)

# Set working directory
setwd(wd)

# Read the user's data
df1 <- read.csv(user_filename, header = T)

# Read the downloaded Data Commons CSV file into a new data frame
df2 <- read.csv(dcw_filename, header=T)

# Merge the two data frames using the appropriate column names
merged_df <- left_join(df1, df2, by=setNames(nm=user_colname, dcw_colname))

# Export merged data to CSV
write.csv(merged_df, output_filename, row.names = F)