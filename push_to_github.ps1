if (Test-Path ".git\index.lock") {
    Remove-Item ".git\index.lock" -Force
}

git config user.email "dev@example.com"
git config user.name "Dev"

git add .
git commit -m "Initial commit"
git branch -M main

# Remove origin if it exists to avoid errors
git remote remove origin 2>$null
git remote add origin https://github.com/cossouarmand3-beep/izi-facture.git

git push -u origin main
