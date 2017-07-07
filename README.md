To run the frontend form builder, just run two commands in your terminal:

* npm install
* webpack

Then, open index.html

Here is some JSON data if you would like a pre-built form. Just go to the exports tab, copy-paste the JSON data below, and click `Import Data`!

```
{"question0":{"question":"Do you own a car?","type":"radio","conditional":null,"conditionValue":null,"subQuestions":{"question0":{"question":"What's your car's model?","type":"text","conditional":"yes","conditionValue":"","subQuestions":{"question0":{"question":"What color is your Ford?","type":"text","conditional":"similar","conditionValue":"Ford","subQuestions":{}},"question1":{"question":"How many wheels on your Ford?","type":"number","conditional":"similar","conditionValue":"Ford","subQuestions":{"question0":{"question":"Is your Ford road legal?","type":"radio","conditional":"greater","conditionValue":"4","subQuestions":{}}}},"question2":{"question":"Has your Toyota been recalled?","type":"radio","conditional":"similar","conditionValue":"Toyota","subQuestions":{}}}}}},"question1":{"question":"What year was your building built?","type":"number","conditional":null,"conditionValue":null,"subQuestions":{}},"question2":{"question":"What's your company name?","type":"text","conditional":null,"conditionValue":null,"subQuestions":{}}}
```

Quick Note: I created this in a Windows Chrome environment. There may be some small differences in styling between browsers here and there, such as some differences in webkit appearance.

Enjoy!
