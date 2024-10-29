# PowerShell script
# Language:  powershell / pwsh
# Purpose:   Auto-fix all linebreaks / end-of-line characters (LF vs CRLF).
# Context:   The repo should have files committed and should be clean, with no
#            edits to files; there can be new files in the repo, but those files
#            won't be fixed.
# Execution: In the shell, from the root of the repo, execute the following:
#            .\tools\fix-linebreaks.ps1


# 0. Requirement
try {
  $RequiredFile = ".\.config\.gitconfig_temp"
  [System.IO.File]::OpenRead($RequiredFile).Close()
  # If successful, the required file exists and is readable, so continue.
}
catch {
  # If unsuccessful, the required file either doesn't exist or isn't readable,
  # so we must exit and abort the fix-linebreaks attempt.
  Write-Output "Error: Missing required file '$RequiredFile' - aborting fix-linebreaks attempt."
  Exit 1
}


# 1. Fix any incorrect file linebreaks according to .gitattributes.
Write-Output "Fixing any incorrect file linebreaks according to .gitattributes."
#    FYI: linebreaks = line-endings = end-of-line characters ~ eol
#    1. Use the temporary git config file with a copy of the git attributes file
#        at the root of the repo to allow the following steps to work properly.
#        `rm .gitconfig`
#        `cp .config/.gitconfig_temp .gitconfig`
#        `cp .config/.gitattributes .gitattributes`
Remove-Item .gitconfig
Copy-Item .config/.gitconfig_temp .gitconfig
Copy-Item .config/.gitattributes .gitattributes
#        You can confirm linebreak discrepancies explicitly with the command
#        `git ls-files --stage --abbrev --eol`
#        which will show whether there is disagreement between "i"/index,
#        "w"/workspace, and "attr"/gitattributes. Such a disagreement, between
#        "w/crlf" and "attr/text eol=lf" line endings can show up like this:
#        `i/lf    w/crlf  attr/text eol=lf        .eslintrc.json`
#    2. If there are discrepancies, you can automatically correct the files by
#        deleting all of the (non-ignored) files in the working tree and then
#        check them out from the index:
#        For Bash:       `git ls-files -z | xargs -0 rm -f`
#        For PowerShell: `git ls-files | ForEach-Object {Remove-Item $_}`
git ls-files | ForEach-Object {Remove-Item $_}
#        `git checkout .`  (for both shells)
git checkout .
#        You can confirm the fix of the line endings with
#        `git ls-files --stage --abbrev --eol`
#    3. Finish restoring the git configs.
#        (The checkout restored .gitconfig.)
#        `rm .gitattributes`
Remove-Item .gitattributes

# Note on fixing "by hand" any incorrect file line-endings a file.
#   1. Open the repo root folder `react-ts` in VSCode by executing
#      `code .`
#   2. Select a file to view in the (primary)
#      [side bar](https://code.visualstudio.com/docs/getstarted/userinterface) /
#      Explorer.
#   3. Note that for any viewed file, you should see a line-ending indicator,
#      showing either "LF" or "CRLF", in the lower right corner of the window in
#      the [status bar](https://code.visualstudio.com/docs/getstarted/userinterface).
#      If you ever need to change the line-endings type of a file, you can click
#      on that indicator to initiate that change.
