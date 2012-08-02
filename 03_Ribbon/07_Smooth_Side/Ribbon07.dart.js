function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC3) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC3) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC3);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) == null || $.index(this._keys, index) === $.CTC3) this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, ({E: 'V'}));
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC3) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, ({E: 'V'}));
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC3) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t3 = t1.length;
    if (hash < 0 || hash >= t3) throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(existingKey, key)) return hash;
    if (insertionIndex < 0 && $.CTC3 === existingKey) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC3 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true) return false;
  t1.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t3 = t1.length;
  if (value < 0 || value >= t3) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC3));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC3));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t4 = t1.length;
  if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t4) throw $.ioore(t1);
  t2[t1] === $.CTC3 && this._advance$0();
  return this._nextValidIndex < t2.length;
 },
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2))) return false;
  $.index(t2, this._nextValidIndex) === $.CTC3 && this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null) return;
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC2);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC2);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number') return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
 },
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!(this._next == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib0_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
};

$$.Object = {"":
 [],
 super: "",
 noSuchMethod$2: function(name$, args) {
  throw $.captureStackTrace($.NoSuchMethodException$(this, name$, args, null));
 },
 toString$0: function() {
  return $.Primitives_objectToString(this);
 },
 _lib1_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib2_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib3_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib0_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib4_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib3_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib5_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib6_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 _lib7_probeForLookup$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForLookup', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForLookup', [arg0])
},
 visitBufferingSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitBufferingSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitBufferingSendPort', [arg0])
},
 visitBufferingSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitBufferingSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitBufferingSendPort', [arg0])
},
 _lib1_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib2_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib3_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib0_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib4_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib3_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib5_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib8_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib8_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 _lib7_setAttachedInfo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setAttachedInfo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setAttachedInfo', [arg0, arg1])
},
 getContext$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getContext', [arg0])
},
 $dom_addEventListener$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_addEventListener', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_addEventListener', [arg0, arg1, arg2])
},
 getValues$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getValues', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getValues', [])
},
 floor$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('floor', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'floor', [])
},
 truncate$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('truncate', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'truncate', [])
},
 charCodeAt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('charCodeAt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'charCodeAt', [arg0])
},
 $dom_getItem$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_getItem', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_getItem', [arg0])
},
 isNaN$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isNaN', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isNaN', [])
},
 isInfinite$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isInfinite', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isInfinite', [])
},
 $dom_removeItem$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeItem', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeItem', [arg0])
},
 visitList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitList', [arg0])
},
 lastEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('lastEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'lastEntry', [])
},
 _lib1_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib2_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib3_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib0_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib4_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib3_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib5_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib6_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 _lib7_ensureCapacity$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_ensureCapacity', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_ensureCapacity', [])
},
 process$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('process', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'process', [])
},
 $dom_setItem$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_setItem', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_setItem', [arg0, arg1])
},
 operator$tdiv$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$tdiv', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$tdiv', [arg0])
},
 spawnParticle$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('spawnParticle', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'spawnParticle', [])
},
 containsKey$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('containsKey', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'containsKey', [arg0])
},
 toInt$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('toInt', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'toInt', [])
},
 visitWorkerSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitWorkerSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitWorkerSendPort', [arg0])
},
 visitWorkerSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitWorkerSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitWorkerSendPort', [arg0])
},
 beginPath$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('beginPath', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'beginPath', [])
},
 last$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('last', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'last', [])
},
 last$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('last', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'last', [])
},
 quadraticCurveTo$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('quadraticCurveTo', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'quadraticCurveTo', [arg0, arg1, arg2, arg3])
},
 $dom_appendChild$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_appendChild', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_appendChild', [arg0])
},
 firstMatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('firstMatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'firstMatch', [arg0])
},
 next$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'next', [])
},
 remove$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('remove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'remove', [])
},
 remove$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('remove', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'remove', [arg0])
},
 hasNext$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasNext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasNext', [])
},
 operator$ge$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$ge', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$ge', [arg0])
},
 $dom_removeChild$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeChild', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeChild', [arg0])
},
 previousEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('previousEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'previousEntry', [])
},
 allMatches$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('allMatches', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'allMatches', [arg0])
},
 _lib1_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib2_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib3_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib0_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib4_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib3_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib5_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib6_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib8_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib8_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 _lib7_add$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_add', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_add', [arg0, arg1])
},
 maybeCloseWorker$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('maybeCloseWorker', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'maybeCloseWorker', [])
},
 arc$6: function (arg0, arg1, arg2, arg3, arg4, arg5) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('arc', [arg0, arg1, arg2, arg3, arg4, arg5])
      : $.Object.prototype.noSuchMethod$2.call(this, 'arc', [arg0, arg1, arg2, arg3, arg4, arg5])
},
 _lib1_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib2_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib3_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib0_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib4_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib3_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib5_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib8_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib8_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib7_serializeList$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_serializeList', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_serializeList', [arg0])
},
 _lib1_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib2_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib3_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib0_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib4_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib3_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib5_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib8_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib8_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib7_getAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_getAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_getAttachedInfo', [arg0])
},
 _lib1_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib2_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib3_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib0_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib4_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib3_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib5_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib8_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib8_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 _lib7_nativeInitWorkerMessageHandler$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeInitWorkerMessageHandler', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeInitWorkerMessageHandler', [])
},
 prepend$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('prepend', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'prepend', [arg0])
},
 runIteration$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('runIteration', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'runIteration', [])
},
 runIteration$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('runIteration', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'runIteration', [])
},
 operator$mul$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$mul', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$mul', [arg0])
},
 add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'add', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib7_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib7_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib1_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib2_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib0_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib4_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib3_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib5_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib8_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 _lib7_dispatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_dispatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_dispatch', [arg0])
},
 contains$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('contains', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'contains', [arg0])
},
 contains$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('contains', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'contains', [arg0, arg1])
},
 run$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('run', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'run', [])
},
 fill$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('fill', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'fill', [])
},
 visitPrimitive$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitPrimitive', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitPrimitive', [arg0])
},
 stroke$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('stroke', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'stroke', [])
},
 endsWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('endsWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'endsWith', [arg0])
},
 clearRect$4: function (arg0, arg1, arg2, arg3) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clearRect', [arg0, arg1, arg2, arg3])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clearRect', [arg0, arg1, arg2, arg3])
},
 postMessage$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('postMessage', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'postMessage', [arg0])
},
 operator$shl$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$shl', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$shl', [arg0])
},
 addLast$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('addLast', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'addLast', [arg0])
},
 _lib1_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib2_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib3_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib0_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib4_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib3_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib5_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib8_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib8_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 _lib7_nativeDetectEnvironment$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_nativeDetectEnvironment', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_nativeDetectEnvironment', [])
},
 operator$xor$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$xor', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$xor', [arg0])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 group$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('group', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'group', [arg0])
},
 operator$index$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$index', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$index', [arg0])
},
 indexOf$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('indexOf', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'indexOf', [arg0, arg1])
},
 operator$sub$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$sub', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$sub', [arg0])
},
 $dom_replaceChild$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_replaceChild', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_replaceChild', [arg0, arg1])
},
 setInterval$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setInterval', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setInterval', [arg0, arg1])
},
 operator$lt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$lt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$lt', [arg0])
},
 clear$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('clear', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'clear', [])
},
 $dom_key$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_key', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_key', [arg0])
},
 getPropertyValue$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getPropertyValue', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getPropertyValue', [arg0])
},
 dequeue$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('dequeue', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'dequeue', [])
},
 $dom_removeEventListener$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_removeEventListener', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_removeEventListener', [arg0, arg1, arg2])
},
 $dom_clear$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$dom_clear', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$dom_clear', [])
},
 $call$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [])
},
 $call$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0])
},
 $call$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0, arg1])
},
 $call$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('$call', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, '$call', [arg0, arg1, arg2])
},
 forEach$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('forEach', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'forEach', [arg0])
},
 operator$indexSet$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$indexSet', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$indexSet', [arg0, arg1])
},
 operator$and$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$and', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$and', [arg0])
},
 _lib1_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib2_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib3_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib0_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib4_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib3_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib5_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib8_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib8_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib7_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib1_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib2_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib3_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib0_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib4_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib3_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib5_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib8_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib8_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib7_setGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_setGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_setGlobals', [])
},
 _lib1_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib2_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib3_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib0_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib4_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib3_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib5_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib6_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib7_link$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_link', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_link', [arg0, arg1])
},
 _lib1_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib2_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib3_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib0_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib4_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib3_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib5_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib8_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib8_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 _lib7_clearAttachedInfo$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_clearAttachedInfo', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_clearAttachedInfo', [arg0])
},
 hasMatch$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hasMatch', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hasMatch', [arg0])
},
 removeLast$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeLast', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeLast', [])
},
 operator$add$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$add', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$add', [arg0])
},
 _lib1_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib2_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib3_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib0_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib4_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib3_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib5_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib6_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib7_grow$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_grow', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_grow', [arg0])
},
 _lib1_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib2_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib3_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib0_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib4_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib3_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib5_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib8_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib8_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib7_runHelper$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_runHelper', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_runHelper', [])
},
 _lib1_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib2_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib3_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib0_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib4_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib3_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib5_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib6_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 _lib7_probeForAdding$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_probeForAdding', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, '_probeForAdding', [arg0])
},
 operator$gt$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$gt', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$gt', [arg0])
},
 initGlobals$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('initGlobals', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'initGlobals', [])
},
 _lib1_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib2_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib3_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib0_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib4_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib3_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib5_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib6_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 _lib7_asNonSentinelEntry$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_asNonSentinelEntry', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_asNonSentinelEntry', [])
},
 setProperty$3: function (arg0, arg1, arg2) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setProperty', [arg0, arg1, arg2])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setProperty', [arg0, arg1, arg2])
},
 _lib1_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib2_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib3_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib0_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib4_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib3_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib5_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib6_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib8_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib8_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 _lib7_remove$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_remove', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, '_remove', [arg0, arg1])
},
 split$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('split', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'split', [arg0])
},
 _lib1_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib2_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib3_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib0_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib4_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib3_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib5_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib6_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 _lib7_advance$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('_advance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, '_advance', [])
},
 isEmpty$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('isEmpty', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'isEmpty', [])
},
 moveParticles$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('moveParticles', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'moveParticles', [])
},
 ceil$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('ceil', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'ceil', [])
},
 visitNativeJsSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitNativeJsSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitNativeJsSendPort', [arg0])
},
 visitNativeJsSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitNativeJsSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitNativeJsSendPort', [arg0])
},
 hashCode$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('hashCode', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'hashCode', [])
},
 lineTo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('lineTo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'lineTo', [arg0, arg1])
},
 setTimeout$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('setTimeout', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'setTimeout', [arg0, arg1])
},
 reset$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('reset', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'reset', [])
},
 operator$shr$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('operator$shr', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'operator$shr', [arg0])
},
 moveTo$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('moveTo', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'moveTo', [arg0, arg1])
},
 eval$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('eval', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'eval', [arg0])
},
 visitSendPortSync$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPortSync', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPortSync', [arg0])
},
 substring$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('substring', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'substring', [arg0])
},
 substring$2: function (arg0, arg1) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('substring', [arg0, arg1])
      : $.Object.prototype.noSuchMethod$2.call(this, 'substring', [arg0, arg1])
},
 iterator$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('iterator', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'iterator', [])
},
 visitMap$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitMap', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitMap', [arg0])
},
 cleanup$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('cleanup', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'cleanup', [])
},
 getKeys$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('getKeys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'getKeys', [])
},
 removeFirst$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('removeFirst', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'removeFirst', [])
},
 startsWith$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('startsWith', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'startsWith', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 visitSendPort$1: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('visitSendPort', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'visitSendPort', [arg0])
},
 closePath$0: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('closePath', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'closePath', [])
},
 get$_lib1_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib2_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib3_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib0_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib4_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib3_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib5_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib8_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib8_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib7_port: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _port', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _port', [])
},
 get$_lib1_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib2_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib3_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib0_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib4_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib3_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib5_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib8_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib8_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib7_id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _id', [])
},
 get$_lib1_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib2_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib3_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib0_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib4_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib3_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib5_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib6_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$_lib7_element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _element', [])
},
 get$isWorker: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isWorker', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isWorker', [])
},
 get$key: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get key', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get key', [])
},
 get$on: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get on', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get on', [])
},
 get$y: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get y', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get y', [])
},
 get$ignoreCase: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ignoreCase', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ignoreCase', [])
},
 get$_lib1_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib2_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib3_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib0_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib4_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib3_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib5_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib8_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib8_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$_lib7_receivePort: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePort', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePort', [])
},
 get$$$dom_length: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_length', [])
},
 get$_lib1_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib2_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib3_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib0_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib4_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib3_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib5_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib8_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib8_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib7_workerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _workerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _workerId', [])
},
 get$_lib1_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib2_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib3_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib0_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib4_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib3_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib5_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib8_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib8_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$_lib7_receivePortId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _receivePortId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _receivePortId', [])
},
 get$width: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get width', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get width', [])
},
 get$rootContext: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get rootContext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get rootContext', [])
},
 get$fromCommandLine: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get fromCommandLine', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get fromCommandLine', [])
},
 get$length: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get length', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get length', [])
},
 get$ports: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ports', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ports', [])
},
 get$isolates: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get isolates', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get isolates', [])
},
 get$currentManagerId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentManagerId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentManagerId', [])
},
 get$body: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get body', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get body', [])
},
 get$mainManager: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mainManager', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mainManager', [])
},
 get$element: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get element', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get element', [])
},
 get$_lib1_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib2_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib3_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib0_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib4_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib3_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib5_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib6_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$_lib7_next: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _next', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _next', [])
},
 get$set: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get set', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get set', [])
},
 get$nodes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get nodes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get nodes', [])
},
 get$innerHeight: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get innerHeight', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get innerHeight', [])
},
 get$angle: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get angle', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get angle', [])
},
 get$mouseMove: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get mouseMove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get mouseMove', [])
},
 get$value: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get value', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get value', [])
},
 get$midPointY: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get midPointY', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get midPointY', [])
},
 get$nextIsolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get nextIsolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get nextIsolateId', [])
},
 get$$$dom_childNodes: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get $dom_childNodes', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get $dom_childNodes', [])
},
 get$exceptionName: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get exceptionName', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get exceptionName', [])
},
 get$useWorkers: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get useWorkers', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get useWorkers', [])
},
 get$midPointX: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get midPointX', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get midPointX', [])
},
 get$_lib1_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib2_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib3_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib0_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib4_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib3_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib5_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib6_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$_lib7_keys: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _keys', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _keys', [])
},
 get$tag: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get tag', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get tag', [])
},
 get$id: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get id', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get id', [])
},
 get$pattern: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pattern', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pattern', [])
},
 get$xSpeed: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get xSpeed', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get xSpeed', [])
},
 get$innerWidth: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get innerWidth', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get innerWidth', [])
},
 get$currentContext: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get currentContext', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get currentContext', [])
},
 get$needSerialization: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get needSerialization', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get needSerialization', [])
},
 get$topEventLoop: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get topEventLoop', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get topEventLoop', [])
},
 get$onDocumentMouseMove: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get onDocumentMouseMove', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get onDocumentMouseMove', [])
},
 get$distance: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get distance', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get distance', [])
},
 get$_lib1_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib2_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib3_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib0_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib4_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib3_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib5_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib6_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$_lib7_previous: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _previous', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _previous', [])
},
 get$x: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get x', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get x', [])
},
 get$pageY: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pageY', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pageY', [])
},
 get$ySpeed: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get ySpeed', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get ySpeed', [])
},
 get$_lib1_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib2_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib3_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib0_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib4_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib3_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib5_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib6_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$_lib7_backingMap: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _backingMap', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _backingMap', [])
},
 get$multiLine: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get multiLine', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get multiLine', [])
},
 get$height: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get height', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get height', [])
},
 get$radius: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get radius', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get radius', [])
},
 get$parent: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get parent', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get parent', [])
},
 get$p: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get p', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get p', [])
},
 get$_lib1_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib2_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib3_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib0_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib4_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib3_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib5_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib8_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib8_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$_lib7_isolateId: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get _isolateId', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get _isolateId', [])
},
 get$pageX: function () {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('get pageX', [])
      : $.Object.prototype.noSuchMethod$2.call(this, 'get pageX', [])
},
 set$y: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set y', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set y', [arg0])
},
 set$midPointX: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set midPointX', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set midPointX', [arg0])
},
 set$xSpeed: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set xSpeed', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set xSpeed', [arg0])
},
 set$strokeStyle: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set strokeStyle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set strokeStyle', [arg0])
},
 set$currentContext: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set currentContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set currentContext', [arg0])
},
 set$width: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set width', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set width', [arg0])
},
 set$rootContext: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set rootContext', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set rootContext', [arg0])
},
 set$length: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set length', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set length', [arg0])
},
 set$ySpeed: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set ySpeed', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set ySpeed', [arg0])
},
 set$distance: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set distance', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set distance', [arg0])
},
 set$_lib1_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib2_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib3_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib0_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib4_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib3_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib5_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib6_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$_lib7_previous: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _previous', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _previous', [arg0])
},
 set$x: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set x', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set x', [arg0])
},
 set$lineWidth: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set lineWidth', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set lineWidth', [arg0])
},
 set$lineJoin: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set lineJoin', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set lineJoin', [arg0])
},
 set$lineCap: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set lineCap', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set lineCap', [arg0])
},
 set$text: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set text', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set text', [arg0])
},
 set$height: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set height', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set height', [arg0])
},
 set$_lib1_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib2_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib3_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib0_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib4_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib3_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib5_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib6_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$_lib7_next: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set _next', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set _next', [arg0])
},
 set$radius: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set radius', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set radius', [arg0])
},
 set$angle: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set angle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set angle', [arg0])
},
 set$nextIsolateId: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set nextIsolateId', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set nextIsolateId', [arg0])
},
 set$midPointXB: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set midPointXB', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set midPointXB', [arg0])
},
 set$midPointYB: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set midPointYB', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set midPointYB', [arg0])
},
 set$value: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set value', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set value', [arg0])
},
 set$midPointY: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set midPointY', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set midPointY', [arg0])
},
 set$fillStyle: function (arg0) {
  return this.noSuchMethod$2
      ? this.noSuchMethod$2('set fillStyle', [arg0])
      : $.Object.prototype.noSuchMethod$2.call(this, 'set fillStyle', [arg0])
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.BadNumberFormatException = {"":
 ["_s"],
 super: "Object",
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.Ribbon07 = {"":
 ["wind", "ground", "airFriction", "gravity", "maxDistance", "maxParticles", "particleNum", "particles", "mouseY", "mouseX", "context", "canvas", "container"],
 super: "Object",
 moveParticles$0: function() {
  var t1 = this.particleNum;
  var t2 = this.maxParticles;
  var min = $.sub(t1, t2);
  if ($.ltB(min, 0)) min = 0;
  if (typeof min !== 'number') return this.moveParticles$0$bailout(1, t2, min, 0);
  var c = $.sub(this.particleNum, 1);
  if (typeof c !== 'number') return this.moveParticles$0$bailout(2, c, t2, min);
  var t3 = this.gravity;
  var t4 = this.airFriction;
  var t5 = this.ground;
  var t6 = this.maxDistance;
  t2 *= 0.5;
  for (; c > min; --c) {
    var p = $.index(this.particles, 'p ' + $.S(c));
    var nb = $.index(this.particles, 'p ' + $.S(c + 1));
    var nbB = $.index(this.particles, 'p ' + $.S(c - 1));
    if (nb == null) nb = $.Particle$(this.mouseX, this.mouseY, 0, 0, 0);
    p.set$xSpeed($.add(p.get$xSpeed(), this.wind));
    p.set$ySpeed($.add(p.get$ySpeed(), t3));
    p.set$xSpeed($.mul(p.get$xSpeed(), t4));
    p.set$ySpeed($.mul(p.get$ySpeed(), t4));
    p.set$x($.add(p.get$x(), p.get$xSpeed()));
    p.set$y($.add(p.get$y(), p.get$ySpeed()));
    if ($.gtB(c, $.sub(this.particleNum, t2))) p.set$radius($.add(p.get$radius(), 0.5));
    else p.set$radius($.mul(p.get$radius(), 0.95));
    if ($.gtB(p.get$y(), t5)) {
      p.set$y(t5);
      p.set$ySpeed($.mul(p.get$ySpeed(), -1));
    }
    var X = $.sub(p.get$x(), nb.get$x());
    var Y = $.sub(p.get$y(), nb.get$y());
    p.set$distance($.Math_sqrt($.add($.mul(X, X), $.mul(Y, Y))));
    p.set$angle($.Math_atan2(Y, X));
    if ($.gtB(p.get$distance(), t6)) {
      var oldX = p.get$x();
      var oldY = p.get$y();
      t1 = nb.get$x();
      var t7 = $.Math_cos(p.get$angle());
      if (typeof t7 !== 'number') throw $.iae(t7);
      p.set$x($.add(t1, t6 * t7));
      var t8 = nb.get$y();
      var t9 = $.Math_sin(p.get$angle());
      if (typeof t9 !== 'number') throw $.iae(t9);
      p.set$y($.add(t8, t6 * t9));
      p.set$xSpeed($.add(p.get$xSpeed(), $.mul($.sub(p.get$x(), oldX), 0.1)));
      p.set$ySpeed($.add(p.get$ySpeed(), $.mul($.sub(p.get$y(), oldY), 0.1)));
    }
    p.set$midPointX($.add(p.get$x(), $.mul($.sub(nb.get$x(), p.get$x()), 0.5)));
    p.set$midPointY($.add(p.get$y(), $.mul($.sub(nb.get$y(), p.get$y()), 0.5)));
    p.set$midPointXB($.add(p.get$x(), $.mul($.sub(nbB.get$x(), p.get$x()), 0.5)));
    p.set$midPointYB($.add(p.get$y(), $.mul($.sub(nbB.get$y(), p.get$y()), 0.5)));
  }
  this.context.clearRect$4(0, 0, this.canvas.get$width(), this.canvas.get$height());
  c = $.sub(this.particleNum, 1);
  if (typeof c !== 'number') return this.moveParticles$0$bailout(3, c, min, 0);
  for (; c > min; --c) {
    p = $.index(this.particles, 'p ' + $.S(c));
    nb = $.index(this.particles, 'p ' + $.S(c + 1));
    this.context.beginPath$0();
    this.context.set$lineWidth(1);
    t1 = c === $.sub(this.particleNum, 1);
    t2 = this.context;
    if (t1) t2.moveTo$2(p.get$x(), p.get$y());
    else {
      t2.moveTo$2(nb.get$midPointX(), nb.get$midPointY());
      this.context.quadraticCurveTo$4(nb.get$x(), nb.get$y(), p.get$midPointX(), p.get$midPointY());
    }
    this.context.set$lineJoin('round');
    this.context.set$lineCap('round');
    this.context.set$strokeStyle('#444444');
    this.context.stroke$0();
  }
  c = $.sub(this.particleNum, 1);
  if (typeof c !== 'number') return this.moveParticles$0$bailout(4, c, min, 0);
  for (; c > min; --c) {
    p = $.index(this.particles, 'p ' + $.S(c));
    $.index(this.particles, 'p ' + $.S(c + 1));
    this.context.beginPath$0();
    this.context.set$lineWidth(1);
    if (c === $.sub(this.particleNum, 1)) this.context.moveTo$2(p.get$x(), p.get$y());
    else {
      var myAngle = $.add(p.get$angle(), 1.5707963267948966);
      t1 = this.context;
      t2 = p.get$x();
      t3 = $.Math_cos(myAngle);
      if (typeof t3 !== 'number') throw $.iae(t3);
      t2 = $.add(t2, 20 * t3);
      t4 = p.get$y();
      t5 = $.Math_sin(myAngle);
      if (typeof t5 !== 'number') throw $.iae(t5);
      t1.moveTo$2(t2, $.add(t4, 20 * t5));
      t2 = this.context;
      t1 = p.get$x();
      t6 = $.Math_cos(myAngle);
      if (typeof t6 !== 'number') throw $.iae(t6);
      t1 = $.sub(t1, 20 * t6);
      t7 = p.get$y();
      t8 = $.Math_sin(myAngle);
      if (typeof t8 !== 'number') throw $.iae(t8);
      t2.lineTo$2(t1, $.sub(t7, 20 * t8));
    }
    this.context.set$lineJoin('round');
    this.context.set$lineCap('round');
    this.context.set$strokeStyle('#ff0000');
    this.context.stroke$0();
  }
  this.context.beginPath$0();
  this.context.set$lineWidth(1);
  c = $.sub(this.particleNum, 1);
  if (typeof c !== 'number') return this.moveParticles$0$bailout(5, c, min, 0);
  for (; c > min; --c) {
    p = $.index(this.particles, 'p ' + $.S(c));
    nb = $.index(this.particles, 'p ' + $.S(c + 1));
    nbB = $.index(this.particles, 'p ' + $.S(c - 1));
    if (c === $.sub(this.particleNum, 1)) this.context.moveTo$2(p.get$x(), p.get$y());
    else {
      myAngle = $.add(nb.get$angle(), 1.5707963267948966);
      t1 = this.context;
      t2 = p.get$x();
      t3 = $.Math_cos(myAngle);
      if (typeof t3 !== 'number') throw $.iae(t3);
      t2 = $.sub(t2, 20 * t3);
      t4 = p.get$y();
      t5 = $.Math_sin(myAngle);
      if (typeof t5 !== 'number') throw $.iae(t5);
      t4 = $.sub(t4, 20 * t5);
      t6 = nbB.get$midPointX();
      t7 = $.Math_cos(myAngle);
      if (typeof t7 !== 'number') throw $.iae(t7);
      t6 = $.sub(t6, 20 * t7);
      t8 = nbB.get$midPointY();
      t9 = $.Math_sin(myAngle);
      if (typeof t9 !== 'number') throw $.iae(t9);
      t1.quadraticCurveTo$4(t2, t4, t6, $.sub(t8, 20 * t9));
    }
  }
  this.context.set$lineJoin('round');
  this.context.set$lineCap('round');
  this.context.set$strokeStyle('#3399ff');
  this.context.stroke$0();
  c = $.sub(this.particleNum, 1);
  if (typeof c !== 'number') return this.moveParticles$0$bailout(6, c, min, 0);
  for (; c > min; --c) {
    p = $.index(this.particles, 'p ' + $.S(c));
    this.context.set$fillStyle('rgba( 255, 255, 255, 1 )');
    this.context.beginPath$0();
    this.context.arc$6(p.get$x(), p.get$y(), 6, 0, 6.283185307179586, false);
    this.context.closePath$0();
    this.context.fill$0();
    this.context.set$fillStyle('rgba( 50, 50, 50, 1 )');
    this.context.beginPath$0();
    this.context.arc$6(p.get$x(), p.get$y(), 5, 0, 6.283185307179586, false);
    this.context.closePath$0();
    this.context.fill$0();
  }
 },
 moveParticles$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t2 = env0;
      min = env1;
      break;
    case 2:
      c = env0;
      t2 = env1;
      min = env2;
      break;
    case 3:
      c = env0;
      min = env1;
      break;
    case 4:
      c = env0;
      min = env1;
      break;
    case 5:
      c = env0;
      min = env1;
      break;
    case 6:
      c = env0;
      min = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.particleNum;
      var t2 = this.maxParticles;
      var min = $.sub(t1, t2);
      if ($.ltB(min, 0)) min = 0;
    case 1:
      state = 0;
      var c = $.sub(this.particleNum, 1);
    case 2:
      state = 0;
      var t3 = this.gravity;
      var t4 = this.airFriction;
      var t5 = this.ground;
      var t6 = this.maxDistance;
      for (; $.gtB(c, min); c = $.sub(c, 1)) {
        var p = $.index(this.particles, 'p ' + $.S(c));
        var nb = $.index(this.particles, 'p ' + $.S($.add(c, 1)));
        var nbB = $.index(this.particles, 'p ' + $.S($.sub(c, 1)));
        if (nb == null) nb = $.Particle$(this.mouseX, this.mouseY, 0, 0, 0);
        p.set$xSpeed($.add(p.get$xSpeed(), this.wind));
        p.set$ySpeed($.add(p.get$ySpeed(), t3));
        p.set$xSpeed($.mul(p.get$xSpeed(), t4));
        p.set$ySpeed($.mul(p.get$ySpeed(), t4));
        p.set$x($.add(p.get$x(), p.get$xSpeed()));
        p.set$y($.add(p.get$y(), p.get$ySpeed()));
        if ($.gtB(c, $.sub(this.particleNum, t2 * 0.5))) p.set$radius($.add(p.get$radius(), 0.5));
        else p.set$radius($.mul(p.get$radius(), 0.95));
        if ($.gtB(p.get$y(), t5)) {
          p.set$y(t5);
          p.set$ySpeed($.mul(p.get$ySpeed(), -1));
        }
        var X = $.sub(p.get$x(), nb.get$x());
        var Y = $.sub(p.get$y(), nb.get$y());
        p.set$distance($.Math_sqrt($.add($.mul(X, X), $.mul(Y, Y))));
        p.set$angle($.Math_atan2(Y, X));
        if ($.gtB(p.get$distance(), t6)) {
          var oldX = p.get$x();
          var oldY = p.get$y();
          t1 = nb.get$x();
          var t7 = $.Math_cos(p.get$angle());
          if (typeof t7 !== 'number') throw $.iae(t7);
          p.set$x($.add(t1, t6 * t7));
          var t8 = nb.get$y();
          var t9 = $.Math_sin(p.get$angle());
          if (typeof t9 !== 'number') throw $.iae(t9);
          p.set$y($.add(t8, t6 * t9));
          p.set$xSpeed($.add(p.get$xSpeed(), $.mul($.sub(p.get$x(), oldX), 0.1)));
          p.set$ySpeed($.add(p.get$ySpeed(), $.mul($.sub(p.get$y(), oldY), 0.1)));
        }
        p.set$midPointX($.add(p.get$x(), $.mul($.sub(nb.get$x(), p.get$x()), 0.5)));
        p.set$midPointY($.add(p.get$y(), $.mul($.sub(nb.get$y(), p.get$y()), 0.5)));
        p.set$midPointXB($.add(p.get$x(), $.mul($.sub(nbB.get$x(), p.get$x()), 0.5)));
        p.set$midPointYB($.add(p.get$y(), $.mul($.sub(nbB.get$y(), p.get$y()), 0.5)));
      }
      this.context.clearRect$4(0, 0, this.canvas.get$width(), this.canvas.get$height());
      c = $.sub(this.particleNum, 1);
    case 3:
      state = 0;
      for (; $.gtB(c, min); c = $.sub(c, 1)) {
        p = $.index(this.particles, 'p ' + $.S(c));
        nb = $.index(this.particles, 'p ' + $.S($.add(c, 1)));
        this.context.beginPath$0();
        this.context.set$lineWidth(1);
        t1 = $.eqB(c, $.sub(this.particleNum, 1));
        t2 = this.context;
        if (t1) t2.moveTo$2(p.get$x(), p.get$y());
        else {
          t2.moveTo$2(nb.get$midPointX(), nb.get$midPointY());
          this.context.quadraticCurveTo$4(nb.get$x(), nb.get$y(), p.get$midPointX(), p.get$midPointY());
        }
        this.context.set$lineJoin('round');
        this.context.set$lineCap('round');
        this.context.set$strokeStyle('#444444');
        this.context.stroke$0();
      }
      c = $.sub(this.particleNum, 1);
    case 4:
      state = 0;
      for (; $.gtB(c, min); c = $.sub(c, 1)) {
        p = $.index(this.particles, 'p ' + $.S(c));
        $.index(this.particles, 'p ' + $.S($.add(c, 1)));
        this.context.beginPath$0();
        this.context.set$lineWidth(1);
        if ($.eqB(c, $.sub(this.particleNum, 1))) this.context.moveTo$2(p.get$x(), p.get$y());
        else {
          var myAngle = $.add(p.get$angle(), 1.5707963267948966);
          t1 = this.context;
          t2 = p.get$x();
          t3 = $.Math_cos(myAngle);
          if (typeof t3 !== 'number') throw $.iae(t3);
          t2 = $.add(t2, 20 * t3);
          t4 = p.get$y();
          t5 = $.Math_sin(myAngle);
          if (typeof t5 !== 'number') throw $.iae(t5);
          t1.moveTo$2(t2, $.add(t4, 20 * t5));
          t2 = this.context;
          t1 = p.get$x();
          t6 = $.Math_cos(myAngle);
          if (typeof t6 !== 'number') throw $.iae(t6);
          t1 = $.sub(t1, 20 * t6);
          t7 = p.get$y();
          t8 = $.Math_sin(myAngle);
          if (typeof t8 !== 'number') throw $.iae(t8);
          t2.lineTo$2(t1, $.sub(t7, 20 * t8));
        }
        this.context.set$lineJoin('round');
        this.context.set$lineCap('round');
        this.context.set$strokeStyle('#ff0000');
        this.context.stroke$0();
      }
      this.context.beginPath$0();
      this.context.set$lineWidth(1);
      c = $.sub(this.particleNum, 1);
    case 5:
      state = 0;
      for (; $.gtB(c, min); c = $.sub(c, 1)) {
        p = $.index(this.particles, 'p ' + $.S(c));
        nb = $.index(this.particles, 'p ' + $.S($.add(c, 1)));
        nbB = $.index(this.particles, 'p ' + $.S($.sub(c, 1)));
        if ($.eqB(c, $.sub(this.particleNum, 1))) this.context.moveTo$2(p.get$x(), p.get$y());
        else {
          myAngle = $.add(nb.get$angle(), 1.5707963267948966);
          t1 = this.context;
          t2 = p.get$x();
          t3 = $.Math_cos(myAngle);
          if (typeof t3 !== 'number') throw $.iae(t3);
          t2 = $.sub(t2, 20 * t3);
          t4 = p.get$y();
          t5 = $.Math_sin(myAngle);
          if (typeof t5 !== 'number') throw $.iae(t5);
          t4 = $.sub(t4, 20 * t5);
          t6 = nbB.get$midPointX();
          t7 = $.Math_cos(myAngle);
          if (typeof t7 !== 'number') throw $.iae(t7);
          t6 = $.sub(t6, 20 * t7);
          t8 = nbB.get$midPointY();
          t9 = $.Math_sin(myAngle);
          if (typeof t9 !== 'number') throw $.iae(t9);
          t1.quadraticCurveTo$4(t2, t4, t6, $.sub(t8, 20 * t9));
        }
      }
      this.context.set$lineJoin('round');
      this.context.set$lineCap('round');
      this.context.set$strokeStyle('#3399ff');
      this.context.stroke$0();
      c = $.sub(this.particleNum, 1);
    case 6:
      state = 0;
      for (; $.gtB(c, min); c = $.sub(c, 1)) {
        p = $.index(this.particles, 'p ' + $.S(c));
        this.context.set$fillStyle('rgba( 255, 255, 255, 1 )');
        this.context.beginPath$0();
        this.context.arc$6(p.get$x(), p.get$y(), 6, 0, 6.283185307179586, false);
        this.context.closePath$0();
        this.context.fill$0();
        this.context.set$fillStyle('rgba( 50, 50, 50, 1 )');
        this.context.beginPath$0();
        this.context.arc$6(p.get$x(), p.get$y(), 5, 0, 6.283185307179586, false);
        this.context.closePath$0();
        this.context.fill$0();
      }
  }
 },
 spawnParticle$0: function() {
  var mag = $.mul($.Math_random(), 2);
  var dir = $.mul($.mul($.Math_random(), 3.141592653589793), 2);
  $.indexSet(this.particles, 'p ' + $.S(this.particleNum), $.Particle$(this.mouseX, this.mouseY, $.mul($.Math_cos(dir), mag), $.mul($.Math_sin(dir), mag), $.mul($.Math_random(), 20)));
  var t1 = this.particleNum;
  var t2 = this.maxParticles;
  if ($.gtB(t1, t2)) {
    var currParticle = $.sub(this.particleNum, t2);
    this.particles.remove$1('p ' + $.S(currParticle));
  }
  this.particleNum = $.add(this.particleNum, 1);
 },
 onDocumentMouseMove$1: function(event$) {
  this.mouseX = event$.get$pageX();
  this.mouseY = event$.get$pageY();
 },
 get$onDocumentMouseMove: function() { return new $.BoundClosure(this, 'onDocumentMouseMove$1'); },
 run$0: function() {
  this.wind = 0;
  this.mouseX = 0;
  this.mouseY = 0;
  this.particleNum = 0;
  this.particles = $.makeLiteralMap([]);
  this.container = $._ElementFactoryProvider_Element$tag('div');
  $.add$1($.document().get$body().get$nodes(), this.container);
  this.canvas = $._ElementFactoryProvider_Element$tag('canvas');
  var t1 = $.window().get$innerWidth();
  this.canvas.set$width(t1);
  t1 = $.window().get$innerHeight();
  this.canvas.set$height(t1);
  $.add$1(this.container.get$nodes(), this.canvas);
  this.context = this.canvas.getContext$1('2d');
  $.add$1($.document().get$on().get$mouseMove(), this.get$onDocumentMouseMove());
  $.window().setInterval$2(new $.Ribbon07_run_f(this), $.toInt(100.0));
  $.window().setInterval$2(new $.Ribbon07_run_f0(this), $.toInt(33.333333333333336));
 }
};

$$.Particle = {"":
 ["distance=", "midPointYB!", "midPointXB!", "midPointY=", "midPointX=", "angle=", "radius=", "ySpeed=", "xSpeed=", "y=", "x="],
 super: "Object"
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
 }
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
 },
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
 },
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._this.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t5 = t1.length;
  if (t3 < 0 || t3 >= t5) throw $.ioore(t3);
  return t1[t3];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Manager = {"":
 ["managers", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 }
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 }
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!($._window() == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      if (!($._globalState().get$rootContext() == null) && ($._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && ($._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true))) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort) {
    var t1 = $.eqB(this._workerId, other._workerId) && ($.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId));
  } else t1 = false;
  return t1;
 },
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$.Ribbon07_run_f = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  return this.this_0.spawnParticle$0();
 }
};

$$.Ribbon07_run_f0 = {"":
 ["this_1"],
 super: "Closure",
 $call$0: function() {
  return this.this_1.moveParticles$0();
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$1: function(p0) { return this.self[this.target](p0); }
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
  }
  return a === b;
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLDDElement')) return 'HTMLElement';
  if ($.eqB(name$, 'HTMLDTElement')) return 'HTMLElement';
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && ($.isEmpty(name$) !== true && (!(name$ === 'Object') && !(name$ === 'Function.prototype')))) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver') return 'MutationObserver';
  return name$;
};

$.Math_sqrt = function(x) {
  return $.MathNatives_sqrt(x);
};

$.MathNatives_sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  return name$;
};

$.Particle$ = function(x, y, xSpeed, ySpeed, radius) {
  return new $.Particle(0, 0, 0, 0, 0, 0, radius, ySpeed, xSpeed, y, x);
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.Math_atan2 = function(a, b) {
  return $.MathNatives_atan2(a, b);
};

$.MathNatives_atan2 = function(a, b) {
  return Math.atan2($.checkNum(a), $.checkNum(b));
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$.BadNumberFormatException$ = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.Ribbon07$ = function() {
  return new $.Ribbon07(null, 600, 0.97, 0.5, 100, 25, null, null, null, null, null, null, null);
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._ElementFactoryProvider_Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.Ribbon07$().run$0();
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.isInfinite$0();
  return (receiver == Infinity) || (receiver == -Infinity);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._DeprecatedPeerConnectionEventsImpl$ = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$.Math_random = function() {
  return $.MathNatives_random();
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.MathNatives_random = function() {
  return Math.random();
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$._globalState = function() {
  return $globalState;;
};

$._globalState0 = function(val) {
  $globalState = val;;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toInt$0();
  if ($.isNaN(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$('NaN'));
  if ($.isInfinite(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$('Infinity'));
  var truncated = $.truncate(receiver);
  return (truncated == -0.0) ? 0 : truncated;
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC5)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null && !($._dynamicMetadata0() == null)) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC4) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  if ($.contains$1(userAgent, 'Opera') === true) return $.typeNameInOpera;
  return $.constructorNameFallback;
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.Math_sin = function(x) {
  return $.MathNatives_sin(x);
};

$.MathNatives_sin = function(value) {
  return Math.sin($.checkNum(value));
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || ($.eqB(type, 'called_non_callable') || ($.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')))) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || ($.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.Math_cos = function(x) {
  return $.MathNatives_cos(x);
};

$.MathNatives_cos = function(value) {
  return Math.cos($.checkNum(value));
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.$call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC5 = new Isolate.$isolateProperties.Object();
$.CTC3 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC4 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC2 = new Isolate.$isolateProperties.EmptyQueueException();
$.dynamicUnknownElementDispatcher = null;
$._getTypeNameOf = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width=", "height="], {
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
 }
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value="], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width=", "height="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["strokeStyle!", "lineWidth!", "lineJoin!", "lineCap!", "fillStyle!"], {
 stroke$0: function() {
  return this.stroke();
 },
 quadraticCurveTo$4: function(cpx, cpy, x, y) {
  return this.quadraticCurveTo(cpx,cpy,x,y);
 },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
 },
 fill$0: function() {
  return this.fill();
 },
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 beginPath$0: function() {
  return this.beginPath();
 },
 arc$6: function(x, y, radius, startAngle, endAngle, anticlockwise) {
  return this.arc(x,y,radius,startAngle,endAngle,anticlockwise);
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 remove$1: function(token) {
  return this.remove(token);
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLDocument', ["body?"], {
 get$on: function() {
  return $._DocumentEventsImpl$(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 get$on: function() {
  return $._ElementEventsImpl$(this);
 },
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 }
});

$.$defineNativeClass('Element', ["id?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLEmbedElement', ["width=", "height="], {
});

$.$defineNativeClass('Entry', [], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
 },
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
},
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
 },
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 },
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
 }
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', [], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return this.remove(index);
 },
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width=", "height="], {
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width=", "height="], {
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value=", "pattern?", "height="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height="], {
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 remove$1: function(track) {
  return this.remove(track);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 add$1: function(track) {
  return this.add(track);
 },
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["y?", "x?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 remove$0: function() {
  !(this.get$parent() == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
 }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "height="], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value="], {
});

$.$defineNativeClass('HTMLParamElement', ["value="], {
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
 }
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGGlyphRefElement', ["y=", "x="], {
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y=", "x=", "angle="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y=", "x=", "angle="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGPoint', ["y=", "x="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGRect', ["y=", "x=", "width=", "height="], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGTransform', ["angle?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?", "width?", "height?"], {
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "length="], {
});

$.$defineNativeClass('ShadowRoot', [], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 }
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width=", "height="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value="], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('Touch', ["pageY?", "pageX?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('UIEvent', ["pageY?", "pageX?"], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 noSuchMethod$2: function(name$, args) {
  if ($.dynamicUnknownElementDispatcher == null) throw $.captureStackTrace($.NoSuchMethodException$(this, name$, args, null));
  return $.dynamicUnknownElementDispatcher.$call$3(this, name$, args);
 }
});

$.$defineNativeClass('HTMLVideoElement', ["width=", "height="], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 lineWidth$1: function(width) {
  return this.lineWidth(width);
 }
});

$.$defineNativeClass('WebSocket', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', ["length?", "innerWidth?", "innerHeight?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$(this);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
 }
});

$.$defineNativeClass('WorkerContext', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
 }
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 get$id: function() {
  return this.id;;
 }
});

// 217 dynamic classes.
// 333 classes
// 29 !leaf
(function(){
  var v0/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v1/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v2/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v3/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v4/*class(_ElementImpl)*/ = [v2/*class(_SVGElementImpl)*/,v3/*class(_MediaElementImpl)*/,v2/*class(_SVGElementImpl)*/,v3/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v5/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v6/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v7/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v8/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v9/*class(_NodeImpl)*/ = [v4/*class(_ElementImpl)*/,v5/*class(_DocumentFragmentImpl)*/,v6/*class(_DocumentImpl)*/,v7/*class(_CharacterDataImpl)*/,v4/*class(_ElementImpl)*/,v5/*class(_DocumentFragmentImpl)*/,v6/*class(_DocumentImpl)*/,v7/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v10/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v11/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v12/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v1/*class(_SVGTextPositioningElementImpl)*/],
    ['MouseEvent', v0/*class(_MouseEventImpl)*/],
    ['UIEvent', [v0/*class(_MouseEventImpl)*/,v0/*class(_MouseEventImpl)*/,'UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent'].join('|')],
    ['AbstractWorker', v12/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v8/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v7/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v6/*class(_DocumentImpl)*/],
    ['DocumentFragment', v5/*class(_DocumentFragmentImpl)*/],
    ['SVGElement', v2/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v3/*class(_MediaElementImpl)*/],
    ['Element', v4/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Node', v9/*class(_NodeImpl)*/],
    ['MediaStream', v10/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v11/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v8/*class(_WorkerContextImpl)*/,v9/*class(_NodeImpl)*/,v10/*class(_MediaStreamImpl)*/,v11/*class(_IDBRequestImpl)*/,v12/*class(_AbstractWorkerImpl)*/,v8/*class(_WorkerContextImpl)*/,v9/*class(_NodeImpl)*/,v10/*class(_MediaStreamImpl)*/,v11/*class(_IDBRequestImpl)*/,v12/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
