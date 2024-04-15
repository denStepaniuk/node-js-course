import {NasaResponseUtils} from '../src/utils/NasaResponseUtils';
import {AxiosResponse} from 'axios';
import { describe, beforeAll, it, expect } from '@jest/globals'

describe('ResponseUtils test case', () => {
  let responseUtils: NasaResponseUtils;

  beforeAll(() => {
    responseUtils = new NasaResponseUtils();
  })

  it('Should transform response: ', () => {
    let res = {
      data: {
       element_count: 10
      }
    } as AxiosResponse;

    const meteors = responseUtils.countVisibleMeteors(res);

    expect(meteors).toHaveProperty('amount', 10)
    expect(meteors).toEqual({
      amount: 10
    });
    expect(meteors).toBeDefined();
  })
})