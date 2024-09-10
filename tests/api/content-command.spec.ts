import { expect, test   } from '@playwright/test';
import { formatDateForQuery } from '../../src/lib/utils/url-params.js'


/* Link Ids of newly inserted test data. Capture for deletion */
const linkIds = []

test.beforeAll(async ({ request }) => {
    // insert test data
     const response = await request.post('/api/content', {
      data: {
        name: REPO
      }
    });
    expect(response.ok()).toBeTruthy(); 
});
  
  
  // Remove test data
  test.afterAll(async ({ request }) => {
    // Delete the repository
    const response = await request.delete(`/api/content/bulk/${linkIds}`);
    expect(response.ok()).toBeTruthy();
  });
  

test('should retrive data', async({request}) => {
    const resp = await request.get(`/api/content`);
    await expect(resp).toBeOK();

    const json = await resp.json();
    
    expect(json).toHaveProperty('pagination.skip');
    expect(json).toHaveProperty('data');
})

test('filter should work: createdAt > now  ', async({request}) => {    
    const createdAt = new Date();
    const dt = formatDateForQuery(createdAt);
   
    const resp = await request.get(`/api/content?createdAt>${dt}`);
    await expect(resp).toBeOK();

    const json = await resp.json();
    
    expect(json).toHaveProperty('pagination.skip');
    expect(json).toHaveProperty('data');
    expect(json).toHaveProperty('pagination.total', 0)
})

test('filter should work: createdAt < now  ', async({request}) => {    
    const createdAt = new Date();
    const dt = formatDateForQuery(createdAt);
   
    const resp = await request.get(`/api/content?createdAt<${dt}`);
    await expect(resp).toBeOK();

    const json = await resp.json();
    const totalRecs = json?.pagination?.total;
   
    expect(totalRecs).toBeGreaterThan(0);    
})


