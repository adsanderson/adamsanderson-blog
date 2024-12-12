import { type Page } from '@playwright/test';
import { expect, test } from '../fixtures';

test('AdamSanderson.co.uk', async ({ adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();
	await adamSandersonCoUk.expectPostsToExist();
});

test('Accessibility test', async ({ page, adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();

	await expect(page.locator('body')).toMatchAriaSnapshot(`
	  - banner:
	    - heading "Devtings" [level=1]
	    - heading "A blog by Adam Sanderson" [level=2]
	  - main:
	    - article "Blog Posts":
	      - list:
	        - listitem:
	          - 'link "Adding an RSS feed to a Sveltekit Blog ''or: How I Learned to Keep the Feed Alive''"'
	        - listitem:
	          - 'link "Test code through walking a graph ''or: How I learned to walk a graph''"'
	        - listitem:
	          - 'link "How to build in your tests or: How I learned to get the most out of copying"'
	        - listitem:
	          - 'link "First steps in Model-based testing or: How I learned to generate tests"'
	        - listitem:
	          - 'link "Slotting into Preact or: How I learned the root of all things"'
	        - listitem:
	          - 'link "A UI testing approach or: How I wrote the same 3 tests over and over again"'
	        - listitem:
	          - 'link "A critical fix or: How I used critcal path CSS to help speed up loading"'
	        - listitem:
	          - 'link "Interesting things Vol2 or: How I kept learning new stuff"'
	        - listitem:
	          - 'link "Interesting stuff vol1 or: How I learned a bit more about the world"'
	        - listitem:
	          - 'link "How I keep up or: How I use tools to try and keep up to date with as much info as possible"'
	        - listitem:
	          - 'link "What the words do or: How I learned about script behaviour"'
	        - listitem:
	          - 'link "A quick look at testing behaviour or: how to test what it does, not how it does it"'
	        - listitem:
	          - link "The design choices for this site"
	        - listitem:
	          - link "DevTools the third space"
	        - listitem:
	          - link "A Question About Module Dependencies"
	        - listitem:
	          - link "Devtings getting started"
	        - listitem:
	          - link "devtings"
	        - listitem:
	          - link "Kevin Marks and the Indie web"
	        - listitem:
	          - link "From Bootstrap - How to make a point with CSS"
	  - contentinfo:
	    - navigation:
	      - img "Adam Sanderson"
	      - text: A front-end developer based out of Hastings, UK
	      - link "Home"
	      - link "github"
	      - link "twitter"
	      - link "email"
	`);
});
