#!/bin/bash
git checkout dev

echo "enter commit message:"
read message

if [ -z "$message" ]
then
      echo "commit message empty. aborted."
      exit 1
fi

echo "adding changes..."
git add .

echo "committing with message: $message"
git commit -m "$message"

echo "pushing to origin main..."
git push origin dev

echo "done! 🚀"