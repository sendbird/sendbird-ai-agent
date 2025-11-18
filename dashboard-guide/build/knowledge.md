---
hidden: true
---

# Knowledge

The Knowledge page is where you can add and manage your AI agent’s knowledge base with training materials - including websites, files, custom text snippets, and content from platforms like Zendesk, Salesforce, and Confluence. These sources enhance your AI agent’s ability to handle customer questions more effectively.

**Step 1: Add Knowledge**

The AI Agent Dashboard supports the addition of multiple knowledge types, such as website pages, Confluence content, and files. Custom knowledge can also be created directly within the dashboard.

1. Go to Knowledge on your AI Agent Dashboard. This is where you can add, delete, and manage your AI Agent’s knowledge.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcLxuoXQjj1d7X-y3i0PXuCo-AFpcqm5uMlVN9du3f-034mM0TgU4zjKY4NZ17zrCskN3FIkDk4dZO89wVqVDnpvAO8yr4mqccAV1sAqk0lEMzUutGUs0QFws1_z28vzHrJSvtrag?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

2. Click on Add Source + to open the source selection pop-up.

Select the desired type of source:

* Website - Adds a web link as a source, retrieving updated content from web pages.

\*Note: You can fetch up to 100 subpages from the provided URL.

* File - Allows file or document uploads from a computer, suitable for static content.
  * Supported formats: .json, .txt., .md, .pdf, .csv
  * Maximum file size: 5MB
  * Images and PDFs with tables are not yet supported
* Snippet - Enables the creation of custom knowledge snippets.
* Zendesk - Import and add knowledge base articles.
* Salesforce - Integrates with Salesforce to access data such as customer information, sales data, and knowledge articles.
* Confluence - Connects to Confluence for accessing content stored within the workspace.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXd33U9oalCWS_jUJyf0H0c4V2vMmEwXlzO7-GM2xW2_fJfGmPHveGXIadpR6v84vNn7-sgL_iWLPuSBhYOY8QWk7Z3sRfizeag4DSyLCbM57I6hOQhrK_s1BB1THJDPRG_zeYk_?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

3. After uploading the selected sources, ensure they are enabled in the dashboard to make them accessible to the AI Agent.

**Step 2: Enable Knowledge**

Uploaded knowledge must be enabled to be applied to the AI agent. By default, newly added knowledge is set to ‘Disabled’, indicating it is not yet active for the AI agent. To allow the AI agent to utilize this knowledge for real-time engagement, the status must be updated to ‘Enabled.’ Follow the steps below to enable knowledge:

1. Enable or Disable Knowledge:
   1. Toggle the status switch next to a knowledge to update it to ‘Enabled.’
   2. Use the same toggle to switch the status back to ‘Disabled’ if you do not want the AI agent to use a specific knowledge source.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXf4tc80eii4Bdtv5q4KrO9dgG8j1cyO3A90zaz7OljrOk4uIppTLcVxZpzUbjVuTUtas7uv6US07UIZ5nE_w4M4ifNTN2CSChnJ47OGq6Miykt-j2PpRx4-daOaQ8wya7jKeqzm?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

2. Enable multiple knowledge:
   1. Select multiple knowledge sources that need to be enabled.
   2. Click the ‘Enable’ button at the top of the dashboard to activate them all at once.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdXBfk0biHx98D3w7EpdWPE2cMMLGbfyjxOBFTWw-cn3vN66TRygq-UBEKDDrQZFRPoqtNXfZPilgFl0ygT_2U_m4KzheJ5TBQ_BcENPMxR6P1EIgclZ4SR89l-fHSyqoQRk0o2dg?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

3. Test knowledge settings:
   1. Use the bot tester to confirm that the enabled knowledge is applied correctly and functioning as expected.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdOFH8RtXpVwKimCGsuR58bkpZoMiVHEtXyJIUY5TRfNm48e3JCkwG3CsE79SKpKoh9ZGTFEMHbe68oZc0BmVXKFW-b5wFSNXgaXLGmRkr0iNsoT_OiV4aei_ONtwoGoW1NPbCBRg?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

4. Save Changes:
   1. Click the ‘Save’ button once all knowledge sources are configured. The updated settings will automatically apply to the AI agent on your website or application.

**Step 3: Update Knowledge**

Website knowledge is updated automatically on a daily basis. However, to manually refresh the latest version of website Knowledge:

* Click the refresh icon next to the specific knowledge source
* For multiple updates, select the desired knowledge sources and click the ‘Re-sync’ button.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcE3dK_S2-tBsBk3TiyMbNMl9HprTpYT_3LALFckiRjAQbHQWmU6A0qgPSBtNBV2XjwnBVRD3zDHHlElY5S2FJWTCo5mxSDtEXjX-cZz4lcNOIQfF5Z2ARkBaeCX4LzrPDMCmbe1A?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

**Add Salesforce Article**

To add a Salesforce Article as a knowledge source, we first need to update credentials on the Integration page.

1. Visit the Integration page and click Salesforce.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfsWNL2Bj3epN9fJX7fyanq2TOx6ax6mLo12rWRsvLuxMVhbwwJlf8WEW3Mg3N4J-CzBKNk5w7_2cnK0IQ-Uu9qtdn2mG4GHCbtKhQy-joCDFo15N6lGKDDzqrNjuS6p2WxjDGA?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

2. Fill in the credential information and click Save.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe0kLf6TDk4OaTRxDD9zT9aRTKUamk5w66mtQKE4dsQIi-1l7tBdBnOaD6Gw3_V17VtW-6HNhxFSpCaiNSskSLVcKQQLO6DshPTf-sczN8SDRIFp74kVv5FcwTBqIFU09IwC4yMCQ?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="229.83203125">Field</th><th>Description</th></tr></thead><tbody><tr><td>Domain</td><td><p>Add the salesforce domain that you are currently using.</p><p>E.g., sendbird.my.salesforce.com</p></td></tr><tr><td>Username</td><td>Add the username of the API Key.</td></tr><tr><td>Security token</td><td><p>Add the Security token of the username.</p><p>To create a fresh security token, visit Settings > Personal > Reset My Security Token in Salesforce. Once you click the ‘Reset My Security Token’ button, the new security token will be emailed to the username’s email.</p><p><br><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeNWQxOH9C9kU2W8IV8ygSQOH7YQk34Z3qtGKENZPc_mQzGK8YXWlUCMzSlNa_9ueewu9Rh6q4PcaC6f_EJd2wofM7MMxeVW9E8GQ9TWR7z5Z4h3ebZCGKhBsFYRBZX5ywoHJoj?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""></p></td></tr><tr><td>Consumer key</td><td><p>Add your Consumer key.</p><p>Refer to the below ‘How to generate Consumer key and Consumer secret’ for the walkthrough.</p></td></tr><tr><td>Consumer secret</td><td><p>Add your Consumer secret.</p><p>Refer to the below ‘How to generate Consumer key and Consumer secret’ for the walkthrough.</p></td></tr></tbody></table>

\\

3.  Once the credential is saved, visit the Knowledge sources page and click **Add source**.

    <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXf2bQ434Fzo2Qh6IfvBZGUFfLTsEQ7pOGJ6TAokzMM9cABnDei0rMb7-S5ZGpSTyO1wm01sbSIZ7Maskm7yRMyJegLv8HUoyS43l_cYxdQN2l0sHG9_qTT__fgXiKo-nXKFiGoLMw?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>
4. Click **Salesforce**.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcLXkVgumlKX4UbtVVsG8tJBlqj2jSjQcBgfEkevWwWW0jWol5izyfUZorpLi7S4um8510naoVSJ3nNv1YxK9NT1E1iRYHoQlREAx_LYP4HULoRlWjzvI4UD6S9drqNztQY5Du4?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

5. Check the connected domain is correct and click **Add** to integrate the knowledge articles.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXf7SSL7krTwY4PE6X_aslXlI6xNqYlOjGVgfJG_1WHgq_fz6fMI8nI4lnc2TKtx8rlg0gIWH_Y0chntERORZMMKSjrC8jC-opxLtf7_B0emWk8xfdN6lxFvzcYdfnDgTZpVDcmiNg?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

6. Once you click the **Add** button, all knowledge articles in the salesforce domain will be integrated into the AI agent dashboard.
7. Enable the knowledge articles you want to apply to the AI agent and click **Save**.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXc2y0KENH74ceaG4j60tQCnj5NsdV-0uhdkx0QqyRFayU-lhjHvTDs8pa3ioUYkaQpM-mn50jHUif5V92XtH9c0FDAW2vuPYjEw9dyqpwjnAcVImSliheXmmFKbxCS6ZBI9kf38BA?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

#### How to generate Consumer key and Consumer secret

1. Visit the Setup > Apps > App Manager in Salesforce with system admin credential.
2. Click ‘New Connected App.’
3. Select ‘Create a Connected App’ and click Continue.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfbt39C9Ruv0kGCOCJDEMU63cnCekJ8phC8g86lLCQoBMi_yaCXmHu-KVp9z0gzXj-yM1gfwrX2qeCLotbUM_vhj_-zhGHPMUzSLy-8Y_h9ijq3N8uuP9ZAl2epUjCFOz0XLR57?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

4. Fill in ‘Connected App Name,’ ‘API Name,’ and ‘Contact Email.’

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXekGDcsarorh8cgAdxKL_sEKx_ez3bSxUONmdiValsSNFwTjYNt0hCBfE-lsOObKCttahhI73dIR8wErXTgvfVTmRUkgP05UefMmnVW0y1mISoi7IvweNscg4eke9Gr8jNlL7ov?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="229.02734375">Field</th><th>Description</th></tr></thead><tbody><tr><td>Connected App Name</td><td>Fill in your service name.</td></tr><tr><td>API Name</td><td>Please fill in the API name for this app. The API name will be auto-generated when you initially fill in the Connected App Name.</td></tr><tr><td>Contact Email</td><td>Fill in the system admin's email address.</td></tr></tbody></table>

5. In the API(Enable OAuth Settings) section, enable the ‘Enable OAuth Settings’ and fill in the Callback URL as [https://login.salesforce.services/oauth2/callback](https://login.salesforce.services/oauth2/callback).

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeC0aR5EKP3QrRD2u-IQTB1Gx0ZURqpzqZ11SYCLY20tZeP1VUsivg5JgUSqF2Rubcnx6Lk8F6WOnnbXHwo6dpjdusyAUja3j3M4Ce1DGrUDn9QTQtFTpnDBG6yO5lspPFaP9r_?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

5. Select below OAuth Scopes
   * Access Interaction API resources (interaction\_api)
   * Access Lightning applications (lightening)
   * Access content resources (content)
   * Access the Salesforce API Platform (sfap\_api)
   * Manage user data via APIs (api)
   * Manage user data via Web browsers (web)
   * Perform requests at any time (refresh\_token, offline\_access)
6. Then, disable below 3 pillars:
   * Require Proof Key for Code Exchange (PKCE) Extension for Supported Authorization Flows
   * Require Secret for Web Server Flow
   *   Require Secret for Refresh Token Flow

       <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdN5JtOSP4grFuQnygAetOmfDIeRKeMhY95p1far4Yr6mZ_PuJEhKKvvj1pzIism8Q1sjzerqKGfrvZCQFv1k_PNmwq7KkDDjeXsDfqoZpQ4LSEVzb1ZDwXq_fYeR8DQM_QQP-cVw?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>
7.  After saving this, Visit the detail page of the Apps you created and click the ‘Manage Consumer Details.’

    <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdeagTRsRMuFIB5zoeM3aD61vz2XvicM4_zu-sBpUCBdVAcm3hnqlu1LjNTEhR2otUmsjCdUC_mS5cylWS5ZAoW-0ZOdYxA7X42xWYZMGZG8MpDwc2ZkzWaS1BLpUZpmjjI4tA3Dg?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>
8.  Copy the Consumer Details and paste them into the Salesforce Integration page in the AI agent. The Consumer Details appear only once initially, so please save the information somewhere safe.

    <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcvZOpMpK7m9wtw1s8NwNqKQAjW3tloeVobOYXfSvIGLdbD8WODth8EOEQlW-wCuHL32CQMqKsB2UkADYQe8HRsN3w-2vS82kMcuyFGeGcm5nfCSNdKjnYS36Q7ZtUGpTIcztvoCg?key=xS65XOd58rPJOYVnOh8lJEX0" alt=""><figcaption></figcaption></figure>

\
\\
