const { sequelize, DataTypes } = require('./connectSequelize');
const Class = sequelize.define('class', {
    id_class: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    date_up: DataTypes.STRING,
    class_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_class: {
        type: DataTypes.STRING,
    },
    routeStudyIdRoute: {
        type: DataTypes.INTEGER,
        field: 'route_study_id',
        allowNull: false,
    },
    user_admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.STRING,
    },
    end_date: {
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});
const RouteStudy = sequelize.define('route_study', {
    id_route: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    route_name: DataTypes.STRING,
    date_up: DataTypes.STRING,
    description_route: DataTypes.STRING,
    image_route: DataTypes.STRING,
    total_time_route: DataTypes.STRING,
    user_id: DataTypes.INTEGER

}, {
    tableName: 'route_study',
});

const Course = sequelize.define('course', {
    id_course: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    date_up: DataTypes.STRING,
    course_name: DataTypes.STRING,
    image_course: DataTypes.TEXT('long'),
    description_course: DataTypes.TEXT('long'),
    level: DataTypes.STRING,
    time_learn_course: DataTypes.STRING,
    routeStudyIdRoute: {
        type: DataTypes.INTEGER,
        field: 'route_id',
    },
    user_id: DataTypes.INTEGER,
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',

    }
}, {
    tableName: 'course',
});
const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    username: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    dob: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    role: DataTypes.STRING,
    completed_docs: DataTypes.TEXT('long'),
    classIdClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Class,
            key: 'id_class'
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});
const Learn = sequelize.define('learn', {
    id_learn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    date_up: DataTypes.STRING,
    rating_content: DataTypes.STRING,
    rating_number: DataTypes.STRING,
    detail_id: DataTypes.INTEGER,
    userId: {
        type: DataTypes.INTEGER, field: 'user_id'
    } // specify the column name},
}, {
    tableName: 'learn',
});
const PoolCourseCompleted = sequelize.define('pool_course_completed', {
    id_pool_course: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    date_up: DataTypes.STRING,
    class_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Class,
            key: 'id_class',
            // Specify the foreign key name
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: Users,
            key: 'id',
            // Specify the foreign key name
        }
    },
    route_id: {
        type: DataTypes.INTEGER,
        references: {
            model: RouteStudy,
            key: 'id_route',
            // Specify the foreign key name
        }
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Course,
            key: 'id_course',
            // Specify the foreign key name
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}, {
    tableName: 'pool_course_completed',
});

const PoolDocCompleted = sequelize.define('pool_doc_completed', {
    id_pool: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    date_up: DataTypes.STRING,
    class_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Class,
            key: 'id_class',
            // Specify the foreign key name
        }
    },

    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: Users,
            key: 'id',
            // Specify the foreign key name
        }
    },
    courseIdCourse: {
        type: DataTypes.INTEGER,
        references: {
            model: Course,
            key: 'id_course',
            // Specify the foreign key name
        },
        field: 'course_id',
    },
    learn_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Learn,
            key: 'id_learn',
            // Specify the foreign key name
        }
    },
    docIdDoc: {
        type: DataTypes.INTEGER,
        field: 'doc_id',
    },
    arrangeId: {
        type: DataTypes.INTEGER,
        field: 'arrange_id',
    },
    state_docs: DataTypes.STRING,
});

const Doc = sequelize.define('doc', {
    id_doc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    doc_name: DataTypes.TEXT('long'),
    date_up: DataTypes.STRING,
    url: DataTypes.TEXT('long'),
    active: DataTypes.STRING,
    lock: DataTypes.INTEGER,
    id_arrange: DataTypes.INTEGER,
    courseIdCourse: {
        type: DataTypes.INTEGER,
        field: 'course_id',
    },
    learnIdLearn: { type: DataTypes.INTEGER, field: 'learn_id' },
    user_id: DataTypes.INTEGER,
}, {
    tableName: 'doc',
});

module.exports = {
    Class,
    Users,
    RouteStudy,
    Course,
    Learn,
    Doc,
    PoolCourseCompleted,
    PoolDocCompleted
};