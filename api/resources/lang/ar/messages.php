<?php

return [
    "site-name" => "تطبيق إدارة المهام",
    "notifications" => 
    [
        "mail" => [
            "subject" => "تم إضافة مهمة جديدة - تطبيق إدارة المهام",
            "remember" => [
                "title" => "لديك تنبيه جديد - تطبيق إدارة المهام",
                "body" => "تم إرسال تنبيه جديد لك من المدير ، برجاء الدخول للتطبيق للاطلاع علىه...",
                "text" => "نص التنبيه كما يلى"
            ],
            "message" => 'تم إضافة مهمة جديدة بعنوان :title',
            "message2" => 'برجاء الدخول للتطبيق لمعرفة التفاصيل',
            "new-mail" => 'لديك رسالة جديدة! - تطبيق إدارة المهام'
        ]
    ],
    "validations" => 
    [
        "error" => "يجب التأكد من إدخال جميع البيانا المطلوبة بشكل صحيح"
    ],
    "roles" => 
    [
        "names" => [
            "root" => "مبرمج",
            "admin" => "مدير",
            "user" => "مستخدم",
        ],
        "permissions" => [
            "names" => [
                "users" => [
                    "view" => "عرض المستخدمين",
                    "add" => "اضافة مستخدمين",
                    "update" => "تعديل المستخدمين",
                    "delete" => "حذف المستخدمين",
                    "block" => "حجب المستخدمين",
                    "permissions" => [
                        "view" => "عرض التصاريح",
                        "add" => "إضافة التصاريح",
                        "edit" => "تعديل التصاريح",
                        "delete" => "حذف التصاريح",
                    ],
                    "role" => [
                        "view" => "عرض الصلاحيات",
                        "add" => "إضافة الصلاحيات",
                        "edit" => "تعديل الصلاحيات",
                        "delete" => "حذف الصلاحيات",
                    ],
                ],
                "tasks" => [
                    "view" => "عرض المهام",
                    "add" => "اضافة المهام",
                    "update" => "تعديل المهام",
                    "delete" => "حذف المهام",
                ],
                "mail" => [
                    "view" => "عرض البريد",
                    "compose" => "ارسال بريد",
                    "delete" => "حذف بريد"
                ],
                "dashboard" => [
                    "view" => "عرض الصفحة لرئيسية"
                ],
            ],
        ],
        "roles" => [
            "names" => [
                
            ],
        ],
        "errors" => [
            "permission-null" => "يجب تزويد اسم الصلاحية"
        ]
    ],
];