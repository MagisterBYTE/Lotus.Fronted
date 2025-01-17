/**
 * 
 * @param timeoutInMs 
 * @returns 
 */
export function sleep(timeoutInMs: number)
{
  return new Promise<number>((resolve) => setTimeout(resolve, timeoutInMs));
}
