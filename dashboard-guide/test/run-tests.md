# Run tests

The **Run tests** page allows you to use the test conversations to evaluate how your AI agent performs. This page is where actual testing takes place — either manually or on a schedule — and where you view results, performance trends, and pass or fail rates.

***

<figure><img src="../../.gitbook/assets/CleanShot 2025-05-14 at 22.53.13@2x (1).png" alt=""><figcaption></figcaption></figure>

## What is a test set?

A test set is a group of test conversations bundled together to be evaluated at once. Instead of running tests one by one, you can organize multiple conversations into a single set — making it easier to check your AI agent's performance across a variety of scenarios in a single run. It helps you test multiple user intents, edge cases and failure scenarios, and consistency across shared assets such as Knowledge and Actionbooks.

{% hint style="info" %}
Test sets are not shared between Development and Production.
{% endhint %}

### Key capabilities

You can do the following actions on this page:\
1\. **Create a test set:** Select 1 to 100 test conversations and execute test runs in batch.\
2\. **Run test:** Manually trigger test execution against the selected test conversations.\
3\. **Schedule runs:** Set up recurring test runs (e.g., daily, weekly).\
4\. **View test results:** Access logs and charts showing test success rate, status, and detailed pass or fail outcomes.\
5\. **Delete:** Remove an entire test set and all related test logs permanently.

***

## Creating a test set

<figure><img src="../../.gitbook/assets/CleanShot 2025-05-14 at 22.18.42.gif" alt=""><figcaption></figcaption></figure>

1. Log into your [Sendbird AI agent dashboard](https://dashboard.sendbird.com/).
2. Go to **AI agent > Test > Run test sets**.
3. Click **Create test set+.**
4. Add a title, and one or more test conversations.
5. **Save** the test set.

{% hint style="info" %}
**Note**: Test sets cannot be edited once created. To make changes, you will need to create a new set.
{% endhint %}

You can also create a test set through the Test conversation details page (**AI agent > Test > Test conversations**) as shown in the image below.

<figure><img src="../../.gitbook/assets/CleanShot 2025-05-14 at 22.26.49 (1).gif" alt=""><figcaption></figcaption></figure>

***

## Running tests

Once a test set is created, you can manually run it to evaluate your AI agent's current behavior against the expected responses.

### What happens when you run a test set

* The system extracts the user messages from each test conversation in the set.
* Your AI agent generates new responses to the extracted user messages based on its current configuration.
* These responses are then compared to the original expected responses to determine pass or fail, based on the evaluation criteria.

{% hint style="info" %}
**Note:** Modifying shared assets while a test set is running may affect its results.
{% endhint %}

### How to run a test set

<figure><img src="../../.gitbook/assets/CleanShot 2025-05-14 at 22.36.43.gif" alt=""><figcaption></figcaption></figure>

1. Go to **AI agent > Test > Run test sets**.
2. Click on the test set you wish to run.
3. In the top right corner, click **Run test**.
4. Review the confirmation details. Ensure no shared assets are being modified during the test run, as this may impact results.
5. Confirm and **run**. The system will execute the test based on the current agent configuration.

Once complete, you will be able to view success rates and detailed pass or fail results in the same test set details view.

***

## Scheduling test runs

In addition to running test sets manually, you can schedule them to run automatically on a recurring basis. This is especially useful for monitoring regressions over time or validating changes in your AI agent's configuration.

<figure><img src="../../.gitbook/assets/CleanShot 2025-05-14 at 22.44.55@2x (1).png" alt=""><figcaption></figcaption></figure>

### How to schedule a test run

1. Open a test set (**AI agent > Test > Run test sets**).
2. Click **Schedule runs** located in the upper right corner of the test set detail view.
3. Configure the schedule

* Period
  * For a specific period: Define a start and end date.
  * No end date: The test set will continue running on a schedule until manually stopped.
* Start date
  * Select when the first run should begin.
* Repeat
  * Choose how often the test should run (e.g., daily, weekly) and at what time.

{% hint style="info" %}
Note: All times are set in Coordinated Universal Time (UTC).
{% endhint %}

4. **Save**. Your schedule will be applied, and future test runs will occur automatically based on your settings.

***

## Viewing test results

After a test set has been run — either manually or on a schedule — the results are available in the test set detail view. These results help you evaluate whether your AI agent's current responses match the expected ones.

*   Success rate graph

    A trend chart showing performance over time, helping you monitor regressions or improvements
*   Test run log

    A table showing all previous test executions, including:

    * Run date and time
    * Number of test conversations within the test set
    * Status
    * Success rate
    * Pass and Fail count

Each test conversation is evaluated independently. A conversation **passes** if the AI agent's response meets the expected output based on the defined evaluation criteria (such as semantic similarity). A **failure** indicates that the AI agent's response did not meet expectations.

***

## Best practices

* Create focused test sets for specific flows (e.g., onboarding, support, escalation).
* Use scheduled runs to catch regressions after changes to shared assets, or other configurations.
* Monitor success rate trends over time for early detection of performance drops.
