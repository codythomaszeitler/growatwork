class OnLogEvent {
  constructor(entry, careerImprovementClient) {
    this.logged = entry.copy();
    this.careerImprovementClient = careerImprovementClient;
  }
}

class OnLogRemovedEvent {
  constructor(entry, careerImprovementClient) {
    this.removed = entry.copy();
    this.careerImprovementClient = careerImprovementClient;
  }
}

class OnBossAddedEvent {
  constructor(boss) {
    this.boss = boss;
  }

  getBoss() {
    return this.boss;
  }
}

export class CareerImprovementClient {
  constructor(email, username) {
    this.hardWorkEntries = [];
    this.onLogAddListeners = [];
    this.onLogRemovedListeners = [];
    this.type = CareerImprovementClient.getType();
    this.email = email;
    this.username = username;
    this.id = null;
    this.currentOnLogListenerId = 0;
    this.currentOnLogRemoveListenerId = 0;
  }

  static getType() {
    return "careerimprovementclient";
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  addSuperior(superior) {
    const hasSuperior = () => {
      let hasSuperior = false;
      for (let i = 0; i < this.superiors.length; i++) {
        hasSuperior = superior.getName() === this.superiors[i].getName();
      }
      return hasSuperior;
    };

    if (hasSuperior(superior)) {
      throw new Error(
        "Boss [" +
          superior.getName() +
          "] already existed on client [" +
          this.getUsername() +
          "]"
      );
    }

    this.superiors.push(superior);

    for (let i = 0; i < this.onAddBossAddedListeners.length; i++) {
      const event = new OnBossAddedEvent(superior);
      this.onAddBossAddedListeners[i].onBossAdded(event);
    }
  }

  contains(toCheck) {
    let containsEntry = false;
    for (let i = 0; i < this.hardWorkEntries.length; i++) {
      const hardWorkEntry = this.hardWorkEntries[i];

      if (hardWorkEntry.equals(toCheck)) {
        containsEntry = true;
        break;
      }
    }
    return containsEntry;
  }

  log(hardWorkEntry) {
    if (!hardWorkEntry) {
      throw new Error(
        "Cannot log without a hard work entry to a career improvement client"
      );
    }
    this.checkForDuplicate(hardWorkEntry);

    let insertionIndex = this.hardWorkEntries.length;
    for (let i = 0; i < this.hardWorkEntries.length; i++) {
      if (!hardWorkEntry.isAfter(this.hardWorkEntries[i])) {
        insertionIndex = i;
        break;
      }
    }

    this.hardWorkEntries.splice(insertionIndex, 0, hardWorkEntry.copy());
    this.emitOnLogEvent(hardWorkEntry.copy());
  }

  emitOnLogEvent(hardWorkEntry) {
    for (let i = 0; i < this.onLogAddListeners.length; i++) {
      const listener = this.onLogAddListeners[i];
      listener.onLog(new OnLogEvent(hardWorkEntry, this));
    }
  }

  addOnLogListener(listener) {
    if (!listener) {
      throw new Error("Cannot add a listener that does not exist");
    }

    listener.__onLogListenerId = this.currentOnLogListenerId;
    this.currentOnLogListenerId++;
    this.onLogAddListeners.push(listener);
  }

  removeOnLogListener(listener) {
    this.onLogAddListeners = this.onLogAddListeners.filter(function (
      registered
    ) {
      return registered.__onLogListenerId !== listener.__onLogListenerId;
    });
  }

  checkForDuplicate(toCheck) {
    if (this.contains(toCheck)) {
      throw new Error("Cannot add the same hard work entry twice");
    }
  }

  remove(hardWorkEntry) {
    let deletionIndex = -1;
    for (let i = 0; i < this.hardWorkEntries.length; i++) {
      if (hardWorkEntry.equals(this.hardWorkEntries[i])) {
        deletionIndex = i;
        break;
      }
    }

    this.hardWorkEntries.splice(deletionIndex, 1);
    this.emitOnLogRemovedEvent(hardWorkEntry);
  }

  emitOnLogRemovedEvent(hardWorkEntry) {
    for (let i = 0; i < this.onLogRemovedListeners.length; i++) {
      const listener = this.onLogRemovedListeners[i];
      listener.onLogRemoved(new OnLogRemovedEvent(hardWorkEntry, this));
    }
  }

  addOnLogRemovedListener(listener) {
    listener.__onLogRemovedListenerId = this.currentOnLogRemoveListenerId;
    this.currentOnLogRemoveListenerId++;
    this.onLogRemovedListeners.push(listener);
  }

  removeOnLogRemovedListener(listener) {
    this.onLogRemovedListeners = this.onLogRemovedListeners.filter(function (
      registered
    ) {
      return (
        listener.__onLogRemovedListenerId !==
        registered.__onLogRemovedListenerId
      );
    });
  }

  getHardWork() {
    return this.hardWorkEntries.slice();
  }

  getAchievements(fromTimestamp, toTimestamp) {
    const withinBoundary = [];

    const achievements = this.getHardWork();

    for (let i = 0; i < achievements.length; i++) {
      const achievement = achievements[i];

      if (
        fromTimestamp.isBefore(achievement.getAccomplishedOn()) &&
        toTimestamp.isAfter(achievement.getAccomplishedOn())
      ) {
        withinBoundary.push(achievement.copy());
      }
    }

    return withinBoundary;
  }

  getEarliestAchievement() {
    const achievements = this.getHardWork();

    let earliestAchievement = null;
    for (let i = 0; i < achievements.length; i++) {
      const achievement = achievements[i];

      if (!earliestAchievement) {
        earliestAchievement = achievement;
      } else if (achievement.isBefore(earliestAchievement)) {
        earliestAchievement = achievement;
      }
    }

    return earliestAchievement;
  }

  getLatestAchievement() {
    const achievements = this.getHardWork();

    let latestAchievement = null;
    for (let i = 0; i < achievements.length; i++) {
      const achievement = achievements[i];

      if (!latestAchievement) {
        latestAchievement = achievement;
      } else if (achievement.isAfter(latestAchievement)) {
        latestAchievement = achievement;
      }
    }

    return latestAchievement;
  }
}
