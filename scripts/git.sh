git add .;

echo "Enter Message:";
read msg;
git commit -m "$msg";
echo "Commiting: $msg";

git push;