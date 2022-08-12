export default class IndexedDB {
	user = null;
	tasks = [];
	dbName;
	dbVersion;
	db;

	constructor(dbName, dbVersion) {
		this.db;
		this.dbName = dbName;
		this.dbVersion = dbVersion;
	}

	connectDB(f = (() => null)) {
		const request = window.indexedDB.open(this.dbName, this.dbVersion);
		request.onerror = e => e.target.error;
		request.onsuccess = () => {
			f(request.result);
		}
		request.onupgradeneeded = e => {
			this.db = e.target.result;
			this.db.createObjectStore('persons', { keyPath: "username" });
			this.db.createObjectStore('tasks', { keyPath: "id", autoIncrement: true })
				.createIndex("user", "user", { unique: false });
		}
	}

	async auth(object) {
		return new Promise(resolve => {
			this.connectDB(db => {
				const transaction = db.transaction(['persons'], 'readwrite');
				const objectStore = transaction.objectStore('persons');
				const request = objectStore.get(object.username);
				request.onsuccess = e => {
					const candidate = e.target.result;
					if (candidate) {
						if (candidate['password'] === object['password']) {
							return resolve(this.user = e.target.result)
						}
						return resolve({ message: 'Wrong password!' })
					}
					console.log(object);
					objectStore.add(object);
					new Promise(() => {
						const request = objectStore.get(object.username);
						request.onsuccess = e => {
							this.user = e.target.result
						}
					})
					resolve({ newUser: object });
				}
			})
		}).then(res => {
			return res;
		})
	}

	async createTask(task) {
		return new Promise(resolve => {
			this.connectDB(db => {
				const transaction = db.transaction(['tasks'], 'readwrite');
				const objectStore = transaction.objectStore('tasks');
				const new_task = objectStore.add(task);
				new_task.onsuccess = e => {
					const task = e.target.result;
					resolve(task);
				}
			})
		}).then(res => {
			return res;
		})
	}

	async getTasks() {
		return new Promise(resolve => {
			this.connectDB(db => {
				const transaction = db.transaction(['tasks'], 'readonly');
				const tasks = transaction.objectStore('tasks').index('user').getAll(this?.user?.username)
				tasks.onsuccess = e => {
					resolve(this.tasks = e.target.result);
				}
			})
		}).then(res => {
			return res;
		})
	}

	async removeTask(id) {
		return new Promise(resolve => {
			this.connectDB(db => {
				const transaction = db.transaction(['tasks'], 'readwrite').objectStore('tasks').delete(id);
				transaction.onsuccess = () => {
					resolve('Task was deleted!');
				}
			})
		}).then(res => {
			return res;
		})
	}

	async updateTask(task) {
		return new Promise(resolve => {
			this.connectDB(db => {
				const objectStore = db.transaction(['tasks'], 'readwrite').objectStore('tasks');
				const request = objectStore.get(task.id);
				request.onsuccess = () => {
					const data = request.result;
					data.done = data.done ? false : true;
					objectStore.put(data);
					resolve('Task was deleted!');
				}
			})
		}).then(res => {
			return res;
		})
	}
}