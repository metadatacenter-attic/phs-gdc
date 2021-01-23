#' Merge user data frame with the DataCommons CSV file by the index column.
#'
#' @param user_df required, data frame pointing to the user table
#' @param dc_file required, file path pointing to the DataCommons CSV file
#' @param user_index_column required, index column for merging from the user table
#' @param dc_index_column required, index column for merging from the DataCommons table
#' @return A merged data frame
#
#' @export
#' @examples
#' # Simple merging operation
#' merged_df <- merge_data(df, "/tmp/myFile.csv", "zip", "zip.code")
merge_data <- function(user_df, dc_file, user_index_column, dc_index_column) {
   dc_df <- read.csv(dc_file, header=T)
   output <- merge(x=user_df, y=dc_df, by.x=user_index_column, by.y=dc_index_column, all.x=T, all.y=F)
   return (output)
}