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
    this.onGoalAddedListeners = [];
    this.type = CareerImprovementClient.getType();
    this.email = email;
    this.username = username;
    this.id = null;
    this.currentOnLogListenerId = 0;
    this.currentOnLogRemoveListenerId = 0;
    this.currentOnGoalAddedListenerId = 0;
    this.goals = [];
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

  hasGoal(goal) {
    let hasGoal = false;

    for (let i = 0; i < this.goals.length; i++) {
      if (this.goals[i].get() === goal.get()) {
        hasGoal = true;
        break;
      }
    }

    return hasGoal;
  }

  addGoal(goal) {

    if (this.hasGoal(goal)) {
      throw new Error('The goal [' + goal.get() + '] has already been added');
    }

    this.goals.push(goal.copy());
    for (let i = 0; i < this.onGoalAddedListeners.length; i++) {
      console.log(this.onGoalAddedListeners[i]);
      this.onGoalAddedListeners[i].onGoalAdded({
        goal: goal.copy(),
      });
    }
  }

  addOnGoalAddedListener(listener) {
    this.onGoalAddedListeners.push(listener);
    listener.__onGoalAddedListenerId = this.currentOnGoalAddedListenerId;
    this.currentOnGoalAddedListenerId = this.currentOnGoalAddedListenerId + 1;
  }

  removeOnGoalAddedListener(listener) {
    this.onGoalAddedListeners = this.onGoalAddedListeners.filter(function (
      registered
    ) {
      return (
        registered.__onGoalAddedListenerId !== listener.__onGoalAddedListenerId
      );
    });
  }

  getGoal(goal) {
    let found = null;

    for (let i = 0; i < this.goals.length; i++) {
      if (this.goals[i].get() === goal.get()) {
        found = goal.copy();
        break;
      }
    }

    return found;
  }

  getGoals() {
    const goals = [];

    for (let i = 0; i < this.goals.length; i++) {
      goals.push(this.goals[i].copy());
    }

    return goals;
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

  log(hardWorkEntry, associatedGoal) {
    const getGoalByRef = (goalName) => {
      let ref = null;
      for (let i = 0; i < this.goals.length; i++) {
        if (this.goals[i].get() === goalName) {
          ref = this.goals[i];
        }
      }
      return ref;
    };

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

    if (associatedGoal) {
      const ref = getGoalByRef(associatedGoal.get());
      if (!ref) {
        throw new Error("Goal [" + associatedGoal.get() + "] was not found");
      }

      ref.associate(hardWorkEntry);
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
