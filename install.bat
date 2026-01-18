@echo off
echo Starting Install > install_log.txt
echo Checking node version >> install_log.txt
node -v >> install_log.txt 2>&1
echo Checking npm version >> install_log.txt
call npm -v >> install_log.txt 2>&1
echo Running create-next-app >> install_log.txt
call npx -y create-next-app@latest token-trading-table --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git >> install_log.txt 2>&1
echo Done >> install_log.txt
