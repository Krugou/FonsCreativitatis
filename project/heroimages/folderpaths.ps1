# Define the folder paths
$folderPaths = @(
    "/",
    "/login",
    "/reviewView",
    "/profile",
    "/reviewupload",
    "/logout",
    "/myreviews",
    "/update",
    "/search",
    "/register",
    "/contactus",
    "/termsofservice",
    "/privacypolicy",
    "/ourteam",
    "/careers",
    "/aboutus",
    "/reviewerprofile/",
    "/nearbyrestaurants"
)

# Loop through each folder path and create the folder and .gitkeep file
foreach ($folderPath in $folderPaths) {
    # Combine the folder path with the current directory to get the full path
    $fullPath = Join-Path $PSScriptRoot $folderPath

    # Create the folder if it doesn't already exist
    if (!(Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath | Out-Null
    }

    # Create the .gitkeep file in the folder
    $gitkeepFile = Join-Path $fullPath ".gitkeep"
    New-Item -ItemType File -Path $gitkeepFile | Out-Null
}
