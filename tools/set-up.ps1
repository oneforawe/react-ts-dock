# PowerShell script
# Language:  powershell / pwsh
# Purpose:   Set up react-ts template to be ready for new-project development.
# Execution: In the shell, from the root of the repo, execute the following:
#            .\tools\set-up.ps1


# 1. Reset and initialize the repo for git.
Write-Output "Resetting and initializing the repo for git."
#    1. Delete the git folder.
#       For Bash:       `rm -rf .git`
#       For PowerShell: `Remove-Item -Recurse -Force .git`
Remove-Item -Recurse -Force .git
#    2. Initialize as a new git repo.
#       `git init`
git init
#    3. Enable the root config file.
#       (Modify the local git config to use the root gitconfig file.)
#       `git config --local include.path ../.gitconfig`
git config --local include.path ../.gitconfig


# 2. Fix any incorrect file linebreaks according to .gitattributes.
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
#    2. Stage all of the (non-ignored) files.
#        This step is necessary for a new repo with no files committed yet.
#        `git add .`
git add . *> $null # silence output for script
#        Note whether there are any warnings based on line endings, including
#        explanations such as
#        "CRLF will be replaced by LF the next time Git touches it"
#        You can confirm this more explicitly with the command
#        `git ls-files --stage --abbrev --eol`
#        which will show whether there is disagreement between "i"/index,
#        "w"/workspace, and "attr"/gitattributes. Such a disagreement, between
#        "w/crlf" and "attr/text eol=lf" line endings can show up like this:
#        `i/lf    w/crlf  attr/text eol=lf        .eslintrc.json`
#    3. If there are no warnings, you can skip the next step.
#    4. If there are warnings, you can automatically correct the files by
#        deleting all of the (non-ignored) files in the working tree and then
#        check them out from the index:
#        For Bash:       `git ls-files -z | xargs -0 rm -f`
#        For PowerShell: `git ls-files | ForEach-Object {Remove-Item $_}`
git ls-files | ForEach-Object {Remove-Item $_}
#        `git checkout .`  (for both shells)
git checkout .
#        You can confirm the fix of the line endings with
#        `git ls-files --stage --abbrev --eol`
#        or by following the next step and git-adding the files again.
#    5. You can unstage if desired: `git rm --cached -r .`
git rm --cached -r . *> $null # silence output for script
#    6. Clean up the temp files and restore the git config.
#        `rm .gitattributes`
#        `rm .gitconfig`
#        `cp .config/.gitconfig_sample .gitconfig`
Remove-Item .gitattributes
Remove-Item .gitconfig
Copy-Item .config/.gitconfig_sample .gitconfig

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


# 3. Create a secrets file.
Write-Output "Creating a secrets file."
#    `cp src/config/secrets_template.ts src/config/secrets.ts`
Copy-Item src/config/secrets_template.ts src/config/secrets.ts
#    This new secrets file will also be ignored, since it's included in the
#    ignore file.


# 4. Install the npm packages.
Write-Output "Installing the npm packages."
#    `npm install`
npm install
# As of 2024-01-24 there are about 14 deprecation warnings and 9
# vulnerabilities (3 moderate, 6 high) expected and the `package-lock.json`
# file is not altered by the installation. The warnings and vulnerabilities are
# [not concerning](https://github.com/facebook/create-react-app/issues/11174).
# After installation, you can check to see if the package-lock file was
# altered, and decide whether this is a concern; note to authors -- in that case
# maybe this repo should be updated.
