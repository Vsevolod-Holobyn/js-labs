const MySortLib = {
    _logStats: function(name, comps, swaps, sparseFound) {
        console.log("Метод: " + name);
        console.log("Порівнянь: " + comps);
        console.log("Обмінів/Переміщень: " + swaps);
        if (sparseFound) {
            console.warn("Повідомлення: У масиві виявлено undefined-елементи.");
        }
    },

    _checkSparse: function(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (!(i in arr) || arr[i] === undefined) return true;
        }
        return false;
    },

    //swap helper
    _swap: function(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    },

    _compare: function(a, b, ascending) {
        if (a === undefined && b === undefined) return 0;
        if (a === undefined) return 1;
        if (b === undefined) return -1;

        if (a === b) return 0;
        return ascending ? (a > b ? 1 : -1) : (a < b ? 1 : -1);
    },

    // 1. Bubble
    bubbleSort: function(array, ascending = true) {
        let arr = [...array];
        let comps = 0, swaps = 0;
        let isSparse = this._checkSparse(arr);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                comps++;
                if (this._compare(arr[j], arr[j + 1], ascending) > 0) {
                    this._swap(arr, j, j + 1);
                    swaps++;
                }
            }
        }
        this._logStats("Обміну (Bubble)", comps, swaps, isSparse);
        return arr;
    },

    // 2. Selection
    selectionSort: function(array, ascending = true) {
        let arr = [...array];
        let comps = 0, swaps = 0;
        let isSparse = this._checkSparse(arr);

        for (let i = 0; i < arr.length - 1; i++) {
            let targetIdx = i;

            for (let j = i + 1; j < arr.length; j++) {
                comps++;
                if (this._compare(arr[j], arr[targetIdx], ascending) < 0) {
                    targetIdx = j;
                }
            }

            if (targetIdx !== i) {
                this._swap(arr, i, targetIdx);
                swaps++;
            }
        }
        this._logStats("Мінімальних елементів", comps, swaps, isSparse);
        return arr;
    },

    // 3. Insertion
    insertionSort: function(array, ascending = true) {
        let arr = [...array];
        let comps = 0, swaps = 0;
        let isSparse = this._checkSparse(arr);

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            while (j >= 0) {
                comps++;
                if (this._compare(arr[j], key, ascending) > 0) {
                    arr[j + 1] = arr[j];
                    swaps++;
                    j--;
                } else break;
            }
            arr[j + 1] = key;
        }
        this._logStats("Вставок", comps, swaps, isSparse);
        return arr;
    },

    // 4. Shell
    shellSort: function(array, ascending = true) {
        let arr = [...array];
        let comps = 0, swaps = 0;
        let isSparse = this._checkSparse(arr);
        let n = arr.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j = i;

                while (j >= gap) {
                    comps++;
                    if (this._compare(arr[j - gap], temp, ascending) > 0) {
                        arr[j] = arr[j - gap];
                        swaps++;
                        j -= gap;
                    } else break;
                }
                arr[j] = temp;
            }
        }
        this._logStats("Шелла", comps, swaps, isSparse);
        return arr;
    },

    // 5. Quick (Хоара)
    quickSort: function(array, ascending = true) {
        let arr = [...array];
        let comps = 0, swaps = 0;
        let isSparse = this._checkSparse(arr);

        const sort = (low, high) => {
            if (low >= high) return;

            let pivot = arr[Math.floor((low + high) / 2)];
            let i = low, j = high;

            while (i <= j) {
                while (this._compare(arr[i], pivot, ascending) < 0) {
                    comps++; i++;
                }
                while (this._compare(arr[j], pivot, ascending) > 0) {
                    comps++; j--;
                }

                if (i <= j) {
                    this._swap(arr, i, j);
                    swaps++;
                    i++; j--;
                }
            }

            if (low < j) sort(low, j);
            if (i < high) sort(i, high);
        };

        sort(0, arr.length - 1);
        this._logStats("Хоара (Швидке)", comps, swaps, isSparse);
        return arr;
    }
};