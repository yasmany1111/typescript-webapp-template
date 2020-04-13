export interface IServerStats {
  usedRam: string;
  totalRam: string;
  networkUsed: string;
  containers: { name: string; active: boolean }[];
}

export class ServerStatsService {
  public getServerStats(
    ramOutput: string,
    vnstatOutput: string,
    dockerPSOutput: string
  ): IServerStats {
    console.log(dockerPSOutput);
    return {
      ...this.parseFreeRamOutput(ramOutput),
      ...this.parseVnstatCommandOutput(vnstatOutput),
      ...this.parseDockerPSCommandOutput(dockerPSOutput)
    } as IServerStats;
  }

  public pingServer(serverURL: string) {}

  private parseDockerPSCommandOutput(commandOutput: string) {
    const containersArray = commandOutput.split('\n');
    return {
      containers: containersArray.map((containerLine) => {
        return { name: containerLine.split(' ')[0], active: containerLine.split(' ')[1] === 'Up' };
      })
    };
  }

  private parseFreeRamOutput(commandOutput: string) {
    const cleanOutput = commandOutput
      .replace(/\s\s+/g, ' ')
      .split('\n')[1]
      .split(' ');

    const totalRam = (parseFloat(cleanOutput[1]) / 1000000).toFixed(2);
    const usedRam = (parseFloat(cleanOutput[2]) / 1000000).toFixed(2);

    return {
      usedRam,
      totalRam
    };
  }

  private parseVnstatCommandOutput(commandOutput: string) {
    return {
      networkUsed: commandOutput
        .split('\n')
        [commandOutput.split('\n').length - 4].split('|')[2]
        .trim()
    };
  }
}
